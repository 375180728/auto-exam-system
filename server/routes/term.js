const termModel = require('../models/term')
const authModel = require('../models/auth')

module.exports = function(router) {
  router.post('/api/term', authModel.accessAuth, authModel.access4Teacher, termModel.create)
  router.get('/api/term', authModel.accessAuth, authModel.access4Teacher, termModel.searchByUser)
  router.put('/api/term', authModel.accessAuth, authModel.access4Teacher, termModel.updateModel)
}