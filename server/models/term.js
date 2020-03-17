const mongoose = require('../database/core');
// const { checkService } = require('../services');
const { RES } = require('../config');
const { ERROR } = require('../helper');
const { wrapExec } = require('../helper/wrap');

/**
 * 学期表
 */
const TermSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    bgColor: { type: String, required: true, default: '#b5bdb9' },
    teacher: { type: String, required: true },
    lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }],
    create_date: { type: Date, required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId,  ref: 'User' },
  },
  { versionKey: false }
);

//创建学期信息
TermSchema.static('create', async (ctx, next) => {
  let termInfo = ctx.request.body;
  const name = termInfo.name;
  const teacher = ctx.request.user.user_id.username;
  let termDB = new termModel(termInfo);
  termDB.teacher = teacher;
  termDB.user_id = ctx.request.user.user_id._id
  termDB.create_date = new Date();
  let result = await wrapExec(ctx.response)(() =>
    termModel.findOne({ teacher: teacher, name: name }).exec()
  );
  if (result) {
    throw new ERROR.BusinessError(['该学期已存在']);
  }
  result = await wrapExec(ctx.response)(() => termDB.save());
  ctx.response.body = RES.SUCCESS(null, ['新建学期成功']);
  await next();
});

//获取学期信息
TermSchema.static('searchByUser', async (ctx, next) => {
  const teacher = ctx.request.user.user_id.username;
  const result = await wrapExec(ctx.response)(() =>
    termModel.find({ teacher: teacher }).populate('lessons').exec()
  );
  console.log(result)
  ctx.response.body = RES.SUCCESS(result, ['success']);
});

//更新和删除学期信息
TermSchema.static('updateModel', async (ctx, next) => {
  if (ctx.request.body.deleted) {
    await wrapExec(ctx.response)(() =>
      termModel.findOneAndDelete({ _id: ctx.request.body._id }).exec()
    );
    ctx.response.body = RES.SUCCESS(null, ['删除成功']);
    return;
  }
  await wrapExec(ctx.response)(() =>
    termModel
      .findOneAndUpdate({ _id: ctx.request.body._id }, { ...ctx.request.body })
      .exec()
  );
  ctx.response.body = RES.SUCCESS(null, ['修改成功']);
});

const termModel = mongoose.model('Term', TermSchema);
module.exports = termModel;
