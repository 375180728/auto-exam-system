const _ = require('lodash');
const mongoose = require('../database/core');
const crypto = require('crypto-js');
const { checkService } = require('../services');
const { RES, USER_ROLES, USER_STATUS, SECRET_KEY } = require('../config');
const { ERROR } = require('../helper');
const { wrapExec } = require('../helper/wrap');

//用户表
const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    salt: { type: String, required: true },
    role: { type: Number, required: true, default: USER_ROLES.STUDENT },
    name: { type: String },
    sex: { type: String },
    phone: { type: String },
    email: { type: String },
    school: { type: String },
    classNum: { type: Number },
    studentNum: { type: Number },
    create_date: { type: Date, required: true },
    update_date: { type: Date },
    status: { type: Number, required: true, default: USER_STATUS.ACTIVATED }
  },
  {
    versionKey: false
  }
);

UserSchema.static('register', async ctx => {
  const user = ctx.request.body;
  let errors = checkService.userRegister(user);
  if (errors.length > 0) {
    throw new ERROR.verifiyError(errors);
  }
  let userDB = new userModel(user);
  const salt = crypto.MD5(new Date().getTime().toString()).toString();
  userDB.salt = salt;
  userDB.password = crypto.AES.encrypt(user.password + salt, SECRET_KEY);
  userDB.create_date = new Date();
  let result = await wrapExec(ctx.response)(() =>
    userModel.findOne({ username: user.username }).exec()
  );
  if (result) {
    throw new ERROR.BusinessError(['用户名已存在']);
  }
  result = await wrapExec(ctx.response)(() => userDB.save());
  ctx.response.body = RES.SUCCESS(null, ['创建用户成功']);
});

//获取用户信息
UserSchema.static('search', async (ctx, next) => {
  const _id = ctx.request.user.user_id;
  let dbUser = await wrapExec(ctx.response)(() =>
    userModel.findOne({ _id: _id }).exec()
  );
  console.log(dbUser);
  ctx.response.body = RES.SUCCESS(
    {
      user_id: dbUser._id,
      username: dbUser.username,
      role: dbUser.role,
      name: dbUser.name,
      sex: dbUser.sex,
      email: dbUser.email,
      phone: dbUser.phone,
      school: dbUser.school,
      classNum: dbUser.classNum,
      studentNum: dbUser.studentNum
    },
    '获取成功'
  );
  await next();
});

UserSchema.static('update', async (ctx, next) => {
  const userInfo = ctx.request.body;
  const _id = ctx.request.user.user_id;
  console.log(userInfo);
  let emailErrors = checkService.emailRegister(userInfo);
  let phoneErrors = checkService.phoneRegister(userInfo);
  let errors = emailErrors.concat(phoneErrors)
  console.log(errors);
  if (errors.length > 0) {
    throw new ERROR.verifiyError(errors);
  }
  await wrapExec(ctx.response)(() =>
    userModel.findOneAndUpdate({ _id: _id }, { ...userInfo })
  );
  ctx.response.body = RES.SUCCESS(null, '更改成功');
  await next();
});

const userModel = mongoose.model('User', UserSchema);
module.exports = userModel;
