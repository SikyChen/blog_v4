// 创建请求路由
const router = require('koa-router')();
// 返回静态文件
// const send = require('koa-send');
const querystring = require('querystring');

// 接口处理
const api = require('./api');

// // 配置路由项
// router.get('/', async ctx => {
//   ctx.message = 'file very ok!';
//   await send(ctx, './public/index.html', {
//     maxAge: 300000,
//   })
// })

// api
router.post('/api', async ctx => {
  if (ctx.request.body.apiName) {
    try {
      ctx.body = await api(ctx);
    }
    catch(err) {
      console.log(err)
      ctx.body = {
        message: err.message,
        code: -1,
      }
    }
  } else {
    ctx.body = {
      message: '未传apiName',
      code: -1,
    }
  }
  ctx.message = 'ajax very ok!';
})

module.exports = router;
