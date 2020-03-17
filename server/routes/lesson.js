const lessonModel = require('../models/lesson')
const authModel = require('../models/auth')

module.exports = function(router) {
  router.post('/api/lesson', authModel.accessAuth, authModel.access4Teacher, lessonModel.create)
  router.get('/api/lesson', authModel.accessAuth, authModel.access4Teacher, lessonModel.searchById)
  router.put('/api/lesson', authModel.accessAuth, authModel.access4Teacher, lessonModel.updateModel)
}