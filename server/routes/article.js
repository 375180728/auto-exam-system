const articleModel = require('../models/article')
const authModel = require('../models/auth')

module.exports = function(router) {
  router.post('/api/article', authModel.accessAuth, authModel.access4Admin, articleModel.create)
  router.get('/api/article/all', articleModel.search)
  router.get('/api/article', articleModel.searchById)
}