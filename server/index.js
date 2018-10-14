const Koa = require('koa');
const koaBody = require('koa-body');
const cors = require('@koa/cors');
const { piApiRouter } = require('./piApiRouter.js');
const { apiRouter } = require('./apiRouter.js');

const app = new Koa();

app.use(async (ctx, next) => {
    console.log('URL: ', ctx.url);

    return await next();
});

app.use(cors())
    .use(koaBody({ multipart: true, jsonLimit: '30mb', formLimit: '30mb' }))
    .use(piApiRouter.routes())
    .use(piApiRouter.allowedMethods())
    .use(apiRouter.routes())
    .use(apiRouter.allowedMethods());

app.listen(8080);
