const Koa = require('koa');
const koaBody = require('koa-body');
const { piApiRouter } = require('./piApiRouter.js');
const { apiRouter } = require('./apiRouter.js');
//const Router = require('koa-router');

const app = new Koa();
//const apiRouter = new Router({ prefix: '/api' });

// apiRouter.get('/current-moods', async (ctx, next) => {
//     ctx.body = `Hello world! Prefix: ${ctx.route.prefix}`;
//     return await next();
// });

console.log(piApiRouter);

app.use(async (ctx, next) => {
    console.log('URL: ', ctx.url);

    return await next();
});

app.use(koaBody({ multipart: true, jsonLimit: '30mb', formLimit: '30mb' }))
    .use(piApiRouter.routes())
    .use(piApiRouter.allowedMethods())
    .use(apiRouter.routes())
    .use(apiRouter.allowedMethods());

app.listen(8080);
