const mongoose = require('../database/core');
const { ERROR } = require('../helper');
const { wrapExec } = require('../helper/wrap');
const { RES } = require('../config');

/**
 * 标签表
 */
const TagSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    color: { type: String, required: true }
  },
  {
    versionKey: false
  }
);

TagSchema.static('create', async (ctx, next) => {
  const tagInfo = {
    name: ctx.request.body.tagName,
    color: ctx.request.body.tagColor
  };
  let tagDB = new tagModel(tagInfo);
  let result = await wrapExec(ctx.response)(() =>
    tagModel.findOne({ name: tagInfo.name }).exec()
  );
  if (result) {
    throw new ERROR.BusinessError(['标签名已存在']);
  }
  result = await wrapExec(ctx.response)(() => tagDB.save());
  ctx.response.body = RES.SUCCESS(null, ['创建标签成功']);
  await next();
});

TagSchema.static('search', async (ctx, next) => {
  let tagList = await wrapExec(ctx.response)(() => tagModel.find().exec());
  if (!tagList) {
    throw new ERROR.BusinessError(['没有标签']);
  }
  ctx.response.body = RES.SUCCESS(tagList, ['获取标签信息成功']);
  await next();
});

const tagModel = mongoose.model('Tag', TagSchema);
module.exports = tagModel;
