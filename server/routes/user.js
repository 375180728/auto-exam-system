const userModel = require('../models/user')
const authModel = require('../models/auth')

module.exports = function(router) {
  router.post('/api/user/register', userModel.register)
  router.get('/api/user', authModel.accessAuth, userModel.search)
  router.put('/api/user', authModel.accessAuth, userModel.update)
}