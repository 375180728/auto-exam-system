const _ = require('lodash');
const { REX } = require('../helper') 

// 用户输入值校验服务
const userRegister = function(user) {
  let errors = [];
  const { username } = user;
  if(!REX.ACCOUNT.test(username)){
    errors.push('用户名格式为4-14位英文数字或下划线组成')
  }
  return errors;
};

const emailRegister = function(userInfo) {
  let errors = [];
  const { email } = userInfo;
  if(!email) {
    return errors;
  }
  if(!REX.EMAIL.test(email)){
    errors.push('邮箱格式不对')
  }
  return errors;
}

const phoneRegister = function(userInfo) {
  let errors = [];
  const { phone } = userInfo;
  if(!phone) {
    return errors;
  }
  if(!REX.PHONE.test(phone)) {
    errors.push('电话格式不对')
  }
  return errors
}

module.exports.userRegister = userRegister;
module.exports.emailRegister = emailRegister;
module.exports.phoneRegister = phoneRegister;