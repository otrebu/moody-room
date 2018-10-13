const Router = require('koa-better-router');
let router = Router({ prefix: '/api' }).loadMethods();

router.get('/current-moods', async (ctx, next) => {
    ctx.body = `Hello world! Prefix: ${ctx.route.prefix}`;
    return await next();
});

module.exports = {
    router
};
