const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

const Koa = require('koa');
const path = require('path');
const static = require('koa-static');
const send = require('koa-send');
const { koaBody } = require('koa-body');

const router = require('./routers');
const initApp = require('./modules/initApp');

const app = new Koa();

const PORT = process.env.PRODUCTION_PORT || 5174;
const APP_KEY_1 = process.env.APP_KEY_1;
const APP_KEY_2 = process.env.APP_KEY_2;

// 用于加密cookie，防止篡改
app.keys = [ APP_KEY_1, APP_KEY_2 ];

// 静态资源
app.use(
  static(path.join(__dirname + '/public'), {
    maxage: 1000 * 60 * 60 * 24,
  })
);

// ctx 未经过 koaBody 中间件的时候，没有 ctx.request.body ，经过 koaBody 之后会加上
// 加上 multipart 用于支持文件上传
app.use(koaBody({multipart: true}));
// 配置路由项
app.use(router.routes()).use(router.allowedMethods());

// 非接口及静态资源，则返回主页 index.html
app.use(async function(ctx, next) {
  await send(ctx, 'index.html', {
    root: __dirname + '/public',
    maxage: 1000 * 60 * 60 * 24,
  } );
});

initApp();

app.listen(PORT, () => {
  console.log('>>> Server Listen In: ' + PORT);
});
