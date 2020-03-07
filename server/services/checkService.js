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

module.exports.userRegister = userRegister;