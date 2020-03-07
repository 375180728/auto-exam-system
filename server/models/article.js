const mongoose = require('../database/core')
const { ERROR } = require('../helper')
const { RES } = require('../config');
const { wrapExec } = require('../helper/wrap')
const tagModel = require('./tag')

/**
 * 文章表
 */

const ArticleSchema = new mongoose.Schema({
  // user_id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  content: { type: String, required: true },
  tags: { type: Array, default: [] },
  nice_num: { type: Number, default: 0 },
  create_date: { type: Date },
  update_date: { type: Date }
},
{
  versionKey: false
})

ArticleSchema.static('create', async(ctx, next) => {
  const articleInfo = ctx.request.body
  if(!articleInfo.title || !articleInfo.description || !articleInfo.tags || !articleInfo.content) {
    throw new ERROR.BusinessError(['信息不完整']);
  }
  let articleDB = new articleModel(articleInfo)
  articleDB.create_date = new Date()
  let result = await wrapExec(ctx.response)(() => articleModel.findOne({ title: articleInfo.title }).exec())
  if(result) {
    throw new ERROR.BusinessError(['文章名已存在']);
  }
  result = await wrapExec(ctx.response)(() => articleDB.save())
  ctx.response.body = RES.SUCCESS(null, ['success'])
  await next()
})

ArticleSchema.static('search', async(ctx, next) => {
  const result = await wrapExec(ctx.response)(() => articleModel.find({}))
  const count = await wrapExec(ctx.response)(() => articleModel.find({}).count())
  ctx.response.body = RES.SUCCESS({ count: count, list: result }, ['success'])
  await next()
})

ArticleSchema.static('searchById', async(ctx, next) => {
  const _id = ctx.query.id
  const result = await wrapExec(ctx.response)(() => articleModel.findOne({ _id: _id }))
  ctx.response.body = RES.SUCCESS(result, ['success'])
})

const articleModel = mongoose.model('Article', ArticleSchema)
module.exports = articleModel