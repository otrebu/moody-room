const Koa = require('koa');
const koaBody = require('koa-body');
const cors = require('@koa/cors');
const serveStatic = require('koa-static');
const { piApiRouter } = require('./piApiRouter.js');
const { apiRouter } = require('./apiRouter.js');

const app = new Koa();

const REACT_ROUTER_PATHS = ['/current', '/history', '/settings'];

app.use(async (ctx, next) => {
    console.log('URL: ', ctx.url);

    return await next();
})
    .use(async (ctx, next) => {
        if (REACT_ROUTER_PATHS.filter(r => ctx.request.path.includes(r)).length > 0)
            ctx.request.path = '/';

        await next();
    })
    .use(serveStatic('../app/build'))
    .use(cors())
    .use(koaBody({ multipart: true, jsonLimit: '30mb', formLimit: '30mb' }))
    .use(piApiRouter.routes())
    .use(piApiRouter.allowedMethods())
    .use(apiRouter.routes())
    .use(apiRouter.allowedMethods());

app.listen(8080);
