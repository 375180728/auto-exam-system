const authModel = require('../models/auth')

module.exports = function(router) {
  router.post('/api/auth/login', authModel.login)
  router.get('/api/auth', authModel.search)
}