// 用户名 4-16位
module.exports.ACCOUNT = /^[a-zA-Z0-9_-]{4,16}$/;

// 邮箱
module.exports.EMAIL = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

//电话号码
module.exports.PHONE = /^1(3[0-9]|4[5,7]|5[0,1,2,3,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8]|8[0-9]|9[1,8,9])\d{8}$/;

//学号
module.exports.STUDENTNUM = /d{10}/;