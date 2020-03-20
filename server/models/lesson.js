const mongoose = require('../database/core');
const { RES } = require('../config');
const { ERROR } = require('../helper');
const { wrapExec } = require('../helper/wrap');
const { randomId } = require('../helper/utils');
const termModel = require('./term');

const ClassSchema = new mongoose.Schema({
  name: { type: String, required: true },
  student: { type: Array, default: [], required: true },
  code: { type: String, required: true }
});

const LessonSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    create_date: { type: Date, required: true },
    teacher: { type: String, required: true },
    term_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Term' },
    class: [ClassSchema],
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
});

//获取课程信息
LessonSchema.static('searchById', async (ctx, next) => {
  const _id = ctx.query.id;
  const result = await wrapExec(ctx.response)(() =>
    lessonModel.findOne({ _id: _id }).exec()
  );
  console.log(result);
  ctx.response.body = RES.SUCCESS(result, ['success']);
  await next();
});

//添加班级
LessonSchema.static('createClass', async (ctx, next) => {
  const name = ctx.request.body.name;
  const _id = ctx.request.body.id;
  const code = randomId(0);
  let classObj = {
    name: name,
    student: [],
    code: code
  };
  let result = await wrapExec(ctx.response)(() =>
    lessonModel
      .findOne({ _id: _id }, { class: { $elemMatch: { name: name } } })
      .exec()
  );
  console.log(result);
  if (result.class.length !== 0) {
    throw new ERROR.BusinessError(['班级已存在']);
  }
  await wrapExec(ctx.response)(() =>
    lessonModel
      .findOneAndUpdate({ _id: _id }, { $push: { class: classObj } })
      .exec()
  );
  result = await wrapExec(ctx.response)(() =>
    lessonModel.find({ _id: _id }).exec()
  );
  ctx.response.body = RES.SUCCESS(result, ['success']);
  await next();
});

//获取班级
LessonSchema.static('searchClass', async (ctx, next) => {
  const _id = ctx.query.id;
  console.log(_id);
  let result = await wrapExec(ctx.response)(() =>
    lessonModel.findOne({ _id: _id }, { class: 1 }).exec()
  );
  ctx.response.body = RES.SUCCESS(result, ['success']);
});

//加入班级
LessonSchema.static('joinClass', async (ctx, next) => {
  const code = ctx.request.body.code;
  console.log(ctx.request.user);
  let user = {
    username: ctx.request.user.user_id.username,
    _id: ctx.request.user.user_id._id
  };
  console.log(user);
  let result = await wrapExec(ctx.response)(() =>
    lessonModel
      .findOne(
        { 'class.code': code },
        { class: { $elemMatch: { code: code } } }
      )
      .update( { $push: { 'class[0].student': user } })
      .exec()
  );
  console.log(result);
  let _id = result._id;
  // await wrapExec(ctx.response)(() =>
  //   lessonModel
  //     .findOneAndUpdate({ 'class.code': code }, { $push: { 'class.student': user }})
  //     .exec()
  // );
  ctx.response.body = RES.SUCCESS(result, ['success']);
});

const lessonModel = mongoose.model('Lesson', LessonSchema);
module.exports = lessonModel;
