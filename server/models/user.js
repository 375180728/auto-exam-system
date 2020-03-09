const _ = require('lodash')
const mongoose = require('../database/core')
const crypto = require('crypto-js')
const { checkService } = require('../services');
const { RES, USER_ROLES, USER_STATUS, SECRET_KEY} = require('../config')
const { ERROR } = require('../helper')
const { wrapExec } = require('../helper/wrap')

//用户表
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  salt: {type: String, required: true},
  role: { type: Number, required: true, default: USER_ROLES.STUDENT },
  create_date: { type: Date, required: true },
  update_date: { type: Date },
  status: { type: Number, required: true, default: USER_STATUS.ACTIVATED },
},
{
  versionKey: false
})

UserSchema.static('register', async (ctx) => {
  const user = ctx.request.body
  let errors = checkService.userRegister(user)
  if(errors.length > 0) {
    throw new ERROR.verifiyError(errors)   
  }
  let userDB = new userModel(user)
  const salt = crypto.MD5(new Date().getTime().toString()).toString()
  userDB.salt = salt
  userDB.password = crypto.AES.encrypt(user.password + salt, SECRET_KEY)
  userDB.create_date = new Date()
  let result = await wrapExec(ctx.response)(() => userModel.findOne({ username: user.username }).exec())
  if(result) {
    throw new ERROR.BusinessError(['用户名已存在']);
  }
  result = await wrapExec(ctx.response)(() => userDB.save())
  ctx.response.body = RES.SUCCESS(null, ['创建用户成功'])
})

const userModel = mongoose.model('User', UserSchema)
module.exports = userModel