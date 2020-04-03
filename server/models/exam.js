const mongoose = require('../database/core');
const { ERROR } = require('../helper');
const { wrapExec } = require('../helper/wrap');
const { RES, EXAM_STATUS } = require('../config');

const questionSchema = new mongoose.Schema({
  stem: { type: String, required: true },
  answer: { type: String, required: true },
  type: { type: Number, required: true },
  score: { type: Number, required: true },
  option: { type: Array },
  fill: { type: Array },
  analysis: { type: String }
});

const MatterSchema = new mongoose.Schema({
  stem: { type: String, required: true },
  question: [questionSchema],
  score: { type: Number, default: 0 },
  num: { type: Number, default: 0 }
});

/**
 * 试卷表
 */
const ExamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    matter: [MatterSchema],
    create_date: { type: Date, required: true },
    update_date: { type: Date },
    status: { type: Number, required: true, default: EXAM_STATUS.UNPUBLISH },
    total: { type: Number, default: 0 },
    score: { type: Number, default: 0 }
  },
  {
    versionKey: false
  }
);

ExamSchema.static('create', async (ctx, next) => {
  let examInfo = {};
  const user_id = ctx.request.user.user_id._id;
  const name = '练习卷' + new Date().toLocaleDateString();
  examInfo.user_id = user_id;
  examInfo.name = name;
  let examDB = new examModel(examInfo);
  examDB.create_date = new Date();
  let result = await wrapExec(ctx.response)(() =>
    examModel.findOne({ name: examInfo.name }).exec()
  );
  result = await wrapExec(ctx.response)(() => examDB.save());
  ctx.response.body = RES.SUCCESS(result._id, ['添加成功']);
  await next();
});

ExamSchema.static('createStem', async (ctx, next) => {
  const stem = ctx.request.body.name;
  const _id = ctx.request.body._id;
  let matterObj = {
    stem: stem,
    score: 0,
    num: 0,
    question: []
  };
  let result = await wrapExec(ctx.response)(() =>
    examModel
      .findOne({ _id: _id }, { matter: { $elemMatch: { stem: stem } } })
      .exec()
  );
  if (result.matter.length !== 0) {
    throw new ERROR.BusinessError(['大题干已存在']);
  }
  await wrapExec(ctx.response)(() =>
    examModel
      .findOneAndUpdate({ _id: _id }, { $push: { matter: matterObj } })
      .exec()
  );
  ctx.response.body = RES.SUCCESS(null, ['添加题干成功']);
  await next();
});

ExamSchema.static('searchById', async (ctx, next) => {
  const _id = ctx.query.id;
  const result = await wrapExec(ctx.response)(() =>
    examModel.findOne({ _id: _id }).exec()
  );
  ctx.response.body = RES.SUCCESS(result, ['success']);
  await next();
});

ExamSchema.static('createQuestion', async (ctx, next) => {
  const body = ctx.request.body;
  const type = body.type;
  let answer = body.answer || body.answers.join('');
  let result = await wrapExec(ctx.response)(() =>
    examModel.findOne(
      { _id: body.paperId },
      { matter: { $elemMatch: { _id: body.stemId } } }
    )
  );
  let question = {
    stem: body.stem,
    type: type,
    answer: answer,
    score: body.score,
    analysis: body.analysis
  };
  if (type === 1 || type === 2) {
    question.option = body.option;
  }
  if (type === 4) {
    let fill = body.fill;
    fill.forEach(element => {
      question.answer += element.index + '.' + element.content + ' ';
    });
  }
  result.matter[0].question.push(question);
  await wrapExec(ctx.response)(() => result.save());
  let score = 0;
  let totalScore = result.matter[0].question.map(element => {
    score = score + element.score;
    return score;
  });
  let finalScore = totalScore[totalScore.length - 1];
  result.matter[0].score = finalScore;
  await wrapExec(ctx.response)(() => result.save());
  result.matter[0].num = totalScore.length;
  await wrapExec(ctx.response)(() => result.save());
  ctx.response.body = RES.SUCCESS(null, ['ok']);
  await next();
});

ExamSchema.static('searchAll', async (ctx, next) => {
  let result = await wrapExec(ctx.response)(() => examModel.find({}).exec());
  ctx.response.body = RES.SUCCESS(result, ['ok']);
  await next();
});

ExamSchema.static('updateQuestion', async (ctx, next) => {});

ExamSchema.static('deleteQuestion', async (ctx, next) => {
  const _id = ctx.query.id;
  let result = await wrapExec(ctx.response)(() =>
    examModel.findOne(
      { _id: ctx.query.paperId },
      { matter: { $elemMatch: { _id: ctx.query.stemId } } }
    )
  );
  result.matter[0].question.map((item, i) => {
    if(item._id == _id) {
      result.matter[0].question.splice(i, 1)
    }
  })
  console.log(result);
  await wrapExec(ctx.response)(() => result.save());
  ctx.response.body = RES.SUCCESS(null, ['删除成功']);
  await next();
});

const examModel = mongoose.model('Exam', ExamSchema);
module.exports = examModel;
