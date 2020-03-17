const Koa = require('koa');
const app = new Koa();
const port = 8081;
const routes = require('./routes/index');
const router = require('koa-router')();
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');

app.listen(port);

//全局异常捕获
app.on('error', async (err, ctx, next) => {
  const { messages, status, error, timestamp } = err.msg;
  // console.log(err)
  let errStruct = {
    status: status,
    messages: messages,
    type: error,
    timestamp: timestamp
  };
  let code = err.code
  ctx.res.writeHead(code, {
      'content-Type':'application/json'
  })
  ctx.res.end(JSON.stringify(errStruct))
});

app.use(bodyParser());

//routes
app.use(router.routes());

//接口路由
routes.user(router);
routes.auth(router);
routes.tag(router);
routes.article(router);
routes.term(router);
routes.lesson(router);
//logger
app.use(logger());

console.log('start at 8081');
