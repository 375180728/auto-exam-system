const lessonModel = require('../models/lesson')
const authModel = require('../models/auth')

module.exports = function(router) {
  router.post('/api/lesson', authModel.accessAuth, authModel.access4Teacher, lessonModel.create)
  router.post('/api/lesson/class', authModel.accessAuth, authModel.access4Teacher, lessonModel.createClass)
  router.get('/api/lesson/class', authModel.accessAuth, authModel.access4Teacher, lessonModel.searchClass)
  router.get('/api/lesson', authModel.accessAuth, authModel.access4Teacher, lessonModel.searchById)
  router.put('/api/lesson', authModel.accessAuth, authModel.access4Teacher, lessonModel.updateModel)

  router.post('/api/lesson/class/join', authModel.accessAuth, authModel.access4Student, lessonModel.joinClass)

}