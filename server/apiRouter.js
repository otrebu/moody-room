const Router = require('koa-router');
const router = new Router({ prefix: '/api' });

router.get('/current-moods', async (ctx, next) => {
    ctx.body = `Hello world! Prefix: ${ctx.route.prefix}`;
    return await next();
});

exports.apiRouter = router;
