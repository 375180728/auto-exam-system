const userModel = require('../models/user')

module.exports = function(router) {
  router.post('/api/user/register', userModel.register)
}