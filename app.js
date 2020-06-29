const Koa = require('koa');
const app = new Koa();
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const router = require('koa-router')();
const index = require('./routes/index.js');
const logUtil = require('./utils/log_util');
const cors = require('koa2-cors');
const koaBody = require('koa-body');

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

// error handler
onerror(app, function (err) { 
  console.log(err)
});
app.use(koaBody({
  multipart: true,
  formidable: {
      maxFileSize: 200*1024*1024    // 设置上传文件大小最大限制，默认2M
  }
}));

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}));


app.use(cors({
  origin: function (ctx) {
    // console.log(ctx)
    // console.log(ctx)
    // if (ctx.url === '/test') {
    //   return false;
    // }
    return '*';
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 200,
  credentials: true,
  allowMethods: ['GET', 'PUT', 'POST'],
  allowHeaders: ['x-requested-with','Content-Type', 'Authorization', 'Accept','usertype','ezo-userid'],
}));
app.use(json());
app.use(logger());

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  //响应间隔时间
  var ms;
  try {
    //开始进入到下一个中间件
    await next();

    ms = new Date() - start;
    //记录响应日志
    logUtil.logResponse(ctx, ms);
  } catch (error) {
    ms = new Date() - start;
    //记录异常日志
    logUtil.logError(ctx, error, ms);
  }
});

// routes
router.use(index.routes(), index.allowedMethods());
app.use(router.routes(), router.allowedMethods());



module.exports = app;
