const Koa = require('koa');
const path = require('path');
const static = require('koa-static');
const { koaBody } = require('koa-body');

const router = require('./routers');
const initApp = require('./modules/initApp');

const app = new Koa();

global.articleList = [];

// 用于加密cookie，防止篡改
app.keys = ['today is a good day', 'what is that'];

// 静态资源服务器
app.use(
  static(path.join(__dirname + '/public'), {
    maxage: 18000
  })
);

// ctx 未经过 koaBody 中间件的时候，没有 ctx.request.body ，经过 koaBody 之后会加上
// 加上 multipart 用于支持文件上传
app.use(koaBody({multipart: true}));

// 配置路由项
app.use(router.routes()).use(router.allowedMethods());

initApp();

app.listen(5174, () => {
  console.log('>>> Server Listen In: ' + 5174);
});
