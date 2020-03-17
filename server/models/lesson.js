const mongoose = require('../database/core');
const { RES } = require('../config');
const { ERROR } = require('../helper');
const { wrapExec } = require('../helper/wrap');
const termModel = require('./term');

const LessonSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    create_date: { type: Date, required: true },
    teacher: { type: String, required: true },
    term_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Term' },
    class: { type: Array, default: [], required: true },
    student: { type: Array, default: [], required: true },
    assist_teacher: { type: Array, default: [], required: false }
  },
  { versionKey: false }
);

//添加课程
LessonSchema.static('create', async (ctx, next) => {
  const body = ctx.request.body;
  let lessonDB = new lessonModel(body);
  lessonDB.create_date = new Date();
  lessonDB.teacher = ctx.request.user.user_id.username;
  await wrapExec(ctx.response)(() => lessonDB.save());
  let result = await wrapExec(ctx.response)(() =>
    lessonModel.find({ term_id: body.term_id }, { _id: 1 }).exec()
  );
  let obj = {
    lessons: result
  };
  await wrapExec(ctx.response)(() =>
    termModel.findOneAndUpdate({ _id: body.term_id }, { ...obj }).exec()
  );
  ctx.response.body = RES.SUCCESS(null, ['课程添加成功']);
  await next();
});

//更新课程信息
LessonSchema.static('updateModel', async (ctx, next) => {
  if (ctx.request.body.deleted) {
    await wrapExec(ctx.response)(() =>
      lessonModel.findOneAndDelete({ _id: ctx.request.body._id }).exec()
    );
    ctx.response.body = RES.SUCCESS(null, ['删除成功']);
    return;
  }
  await wrapExec(ctx.response)(() =>
  lessonModel
      .findOneAndUpdate({ _id: ctx.request.body._id }, { ...ctx.request.body })
      .exec()
  );
  ctx.response.body = RES.SUCCESS(null, ['修改成功']);
  await next();
})

//获取课程信息
LessonSchema.static('searchById', async (ctx, next) => {
  const _id = ctx.query.id;
  const result = await wrapExec(ctx.response)(() =>
    lessonModel.findOne({ _id: _id }).exec()
  );
  console.log(result)
  ctx.response.body = RES.SUCCESS(result, ['success']);
  await next();
});

const lessonModel = mongoose.model('Lesson', LessonSchema);
module.exports = lessonModel;
