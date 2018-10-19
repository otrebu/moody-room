const Koa = require('koa');
const koaBody = require('koa-body');
const cors = require('@koa/cors');
const serveStatic = require('koa-static');
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

//const REACT_ROUTER_PATHS = ['/current', '/history', '/settings'];

const appSever = new Koa();

appSever
    .use(async (ctx, next) => {
        console.log('APP URL: ', ctx.url);

        return await next();
    })
    .use(async (ctx, next) => {
        // if (REACT_ROUTER_PATHS.includes(ctx.request.path)) {
        //     ctx.request.path = '/';
        // }
        ctx.request.path = '/';
        return await next();
    })
    .use(serveStatic('../app/build'))
    .use(cors())
    .listen(8081);
