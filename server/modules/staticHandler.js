
module.exports = async function staticHandler (ctx) {
  const root = __dirname + '/../public';
  await send(ctx, ctx.path, { root: root, maxage: 3 * 24 * 60 * 60, setHeaders: (res, path, stats) => {
    const requestTime = ctx.headers['if-modified-since'];
    const fileTime = new Date(stats.mtime).toUTCString();
    if(requestTime === fileTime) {
      ctx.status = 304;
    }
  } });
}
