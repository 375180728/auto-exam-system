const _ = require('lodash')
const crypto = require('crypto-js')
const mongoose = require('../database/core')
const { ERROR } = require('../helper')
const userModel = require('./user')
const { wrapExec } = require('../helper/wrap')
const { RES, SECRET_KEY, USER_STATUS, TOKEN_EXPIRED_TIME, USER_ROLES } = require('../config')

/**
 * 权限认证表
 */
const AuthSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  token: { type: String, required: true },
  login_ip: { type: String },
  create_date: { type: Date },
  update_date: { type: Date }
},
{
  versionKey: false
})

AuthSchema.static('login', async (ctx) => {
  const reqUser = ctx.request.body
  if(!reqUser.username || !reqUser.password) {
    throw new ERROR.verifiyError(['用户名密码不能为空'])
  }
  //用户是否存在
  let dbUser = await wrapExec(ctx.response)(() => userModel.findOne({ username: reqUser.username }).exec())
  if(!dbUser) {
    throw new ERROR.BusinessError(['用户名不正确'])
  }
  if(dbUser.status == USER_STATUS.INACTIVATED){
    throw new ERROR.BusinessError(['账号未激活，请联系管理员激活账号']);
  }
  if(dbUser.status == USER_STATUS.DISABLE){
    throw new ERROR.BusinessError(['该账号已被禁用']);
  }
  //密码是否正确
  const password = crypto.AES.decrypt(dbUser.password, SECRET_KEY).toString(crypto.enc.Utf8)
  if(password !== crypto.AES.decrypt(reqUser.password, 'pengshixia.dev').toString(crypto.enc.Utf8) + dbUser.salt) {
    throw new ERROR.BusinessError(['密码不正确'])
  }
  //保存登录信息
  const token = crypto.MD5(new Date().getTime().toString() + Math.random()).toString()
  const ip = ctx.ip
  const authDB = {
    user_id: dbUser._id,
    token: token,
    create_date: new Date(),
    update_date: new Date(),
    login_ip: ip
  }
  await wrapExec(ctx.response)(() => authModel.findOneAndUpdate({ user_id: dbUser._id }, authDB, { upsert: true }))
  ctx.response.body = RES.SUCCESS({
    user_id: dbUser._id,
    username: dbUser.username,
    token: token,
    role: dbUser.role
  })
})

//获取用户信息
AuthSchema.static('search', async (ctx) => {
  const token = ctx.query.token
  if(!token) {
    throw new ERROR.BusinessError(['未登录'])
  }
  let dbAuth = await wrapExec(ctx.response)(() => authModel.findOne({ token: token }).exec())
  const _id = dbAuth.user_id
  let dbUser = await wrapExec(ctx.response)(() => userModel.findOne({ _id: _id }).exec())
  ctx.response.body = RES.SUCCESS({
    user_id: dbUser._id,
    username: dbUser.username,
    token: token,
    role: dbUser.role
  })
})

//鉴权
AuthSchema.static('accessAuth', async (ctx, next) => {
  const authorization = ctx.headers.authorization
  if(!authorization) {
    throw new ERROR.NoAuthError()
  }
  let result = await wrapExec(ctx.response)(() => authModel.findOne({ token: authorization }).populate('user_id').exec())
  if(!result || (new Date().getTime() - new Date(result.update_date).getTime()) / 1000 > TOKEN_EXPIRED_TIME){
    throw new ERROR.NoAuthError()
  }
  if(!result.user_id || result.user_id.status != 1) {
    throw new ERROR.NoAuthError()
  }
  ctx.request.user = result;
  await wrapExec(ctx.response)(() => authModel.findOneAndUpdate({ _id: result._id }, {$set: {update_date: new Date()}}))
  await next()
})

AuthSchema.static('access4Admin', async (ctx, next) => {
  if(ctx.request.user.user_id.role != USER_ROLES.ADMIN){
    throw new ERROR.NoAuthError();
  }
  await next()
})

AuthSchema.static('access4Teacher', async (ctx, next) => {
  if(ctx.request.user.user_id.role != USER_ROLES.TEACHER){
    throw new ERROR.NoAuthError();
  }
  await next()
})

AuthSchema.static('access4Student', async (ctx, next) => {
  if(ctx.request.user.user_id.role != USER_ROLES.STUDENT){
    throw new ERROR.NoAuthError();
  }
  await next()
})

const authModel = mongoose.model('Auth', AuthSchema)
module.exports = authModel