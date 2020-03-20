/**
 * 生成一个用不重复的ID
 */
function randomId(randomLength){
  return Number(Math.random().toString().substr(3,randomLength) + Date.now()).toString(36)
 }

 module.exports.randomId = randomId