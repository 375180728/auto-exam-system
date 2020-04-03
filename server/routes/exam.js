const examModel = require('../models/exam')
const authModel = require('../models/auth')

module.exports = function(router) {
  router.post('/api/exam', authModel.accessAuth, authModel.access4Teacher, examModel.create)
  router.post('/api/exam/stem', authModel.accessAuth, authModel.access4Teacher, examModel.createStem)
  router.post('/api/exam/question', authModel.accessAuth, authModel.access4Teacher, examModel.createQuestion)
  router.get('/api/exam', authModel.accessAuth, authModel.access4Teacher, examModel.searchById)
  router.get('/api/exam/all', authModel.accessAuth, authModel.access4Teacher, examModel.searchAll)
  router.delete('/api/exam/question', authModel.accessAuth, authModel.access4Teacher, examModel.deleteQuestion)
}