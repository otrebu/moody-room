const Koa = require('koa');
const cors = require('@koa/cors');
const serveStatic = require('koa-static');
const path = require('path');

const appSever = new Koa();

const REACT_ROUTER_PATHS = ['/current', '/history', '/settings'];

appSever
    .use(async (ctx, next) => {
        console.log('APP URL: ', ctx.url);

        return await next();
    })
    .use(async (ctx, next) => {
        if (REACT_ROUTER_PATHS.includes(ctx.request.path)) {
            ctx.request.path = '/';
        }
        console.log(ctx.request);
        ctx.request.path = '/';
        return await next();
    })
    .use(serveStatic(path.join(__dirname, '../app/build')))
    .use(cors())
    .listen(8081);
