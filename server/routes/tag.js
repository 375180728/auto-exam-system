const tagModel = require('../models/tag')
const authModel = require('../models/auth')

module.exports = function(router) {
  router.post('/api/tag', authModel.accessAuth, authModel.access4Admin, tagModel.create)
  router.get('/api/tag/all', tagModel.search)
}