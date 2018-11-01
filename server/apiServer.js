const Koa = require('koa');
const koaBody = require('koa-body');
const cors = require('@koa/cors');
const { piApiRouter } = require('./piApiRouter.js');
const { apiRouter } = require('./apiRouter.js');

const apiServer = new Koa();

apiServer
    .use(async (ctx, next) => {
        console.log('API URL: ', ctx.url);

        return await next();
    })
    .use(cors())
    .use(koaBody({ multipart: true, jsonLimit: '30mb', formLimit: '30mb' }))
    .use(piApiRouter.routes())
    .use(piApiRouter.allowedMethods())
    .use(apiRouter.routes())
    .use(apiRouter.allowedMethods())
    .listen(8080);
