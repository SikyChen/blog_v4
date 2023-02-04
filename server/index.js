const Koa = require('koa');
const path = require('path');
const static = require('koa-static');
const send = require('koa-send');
const { koaBody } = require('koa-body');

const router = require('./routers');
const initApp = require('./modules/initApp');

const app = new Koa();

const port = process.env.PRODUCTION_PORT || 5174;

// 用于加密cookie，防止篡改
app.keys = ['today is a good day', 'what is that'];

// 静态资源
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

// 非接口及静态资源，则返回主页 index.html
app.use(async function(ctx, next) {
  await send(ctx, 'index.html', { root: __dirname + '/public' } );
});

initApp();

app.listen(port, () => {
  console.log('>>> Server Listen In: ' + port);
});
