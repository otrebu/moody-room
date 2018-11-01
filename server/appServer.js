const Koa = require('koa');
const cors = require('@koa/cors');
const serveStatic = require('koa-static');

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
