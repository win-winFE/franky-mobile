const { parse } = require('url');

async function nextFilter(options, app, ctx) {
  const path = ctx.url;
  const parsedUrl = parse(ctx.url, true);
  ctx.status = 200;
  if (/\.js$/.test(path)) {
    ctx.set('Content-Type', 'application/javascript');
  }
  if (/\.css$/.test(path)) {
    ctx.set('Content-Type', 'text/css');
  }
  const handle = app.next.getRequestHandler();
  await handle(ctx.req, ctx.res, parsedUrl);
}

module.exports = (options, app) => {
  return async function(ctx, next) {
    const path = ctx.url;
    if (/\/_next\//.test(path)) {
      await nextFilter(options, app, ctx);
    } else {
      await next();
      if (ctx.status !== 404 || ctx.method !== 'GET') {
        return;
      }
      await nextFilter(options, app, ctx);
    }
  };
};
