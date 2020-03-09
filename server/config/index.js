module.exports.SECRET_KEY = 'U2FsdGVkX19h37oAKw/0/DsxRFH/8E/wG2ZHK/VeE8wkbncmIjm2aWvQzE106Xp7';

module.exports.DATABASE = { 
  USERNAME: 'exam-system-admin',
  PASSWORD: 'psx980626',
  HOST: '127.0.0.1:27017',
  DB: 'exam-system'
}

module.exports.USER_ROLES = {
  ADMIN: 0,
  STUDENT: 1,
  TEACHER: 2,
  ALL: [0, 1, 2]
}

module.exports.USER_STATUS = {
  INACTIVATED: 0,
  ACTIVATED: 1,
  DISABLE: 2
}

module.exports.TOKEN_EXPIRED_TIME = 3600 * 12;

// 服务器响应值
module.exports.RES = require('./response');


