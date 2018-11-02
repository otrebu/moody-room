const Koa = require('koa');
const cors = require('@koa/cors');
const serveStatic = require('koa-static');
const path = require('path');
const fs = require('fs');
const glob = require('glob');

const appSever = new Koa();
const appFilePath = path.join(__dirname, '../app/build');
let validRoutes = [];

const getAllFiles = (src, callback) => {
    glob(`${src}/**/*`, callback);
};

getAllFiles(appFilePath, (err, res) => {
    if (err) {
        console.log('Error', err);
    } else {
        validRoutes = res.map(filePath => filePath.replace(appFilePath, '').toLowerCase());
    }
});

const isRouteValid = url => {
    if (!validRoutes || !url) return false;
    return validRoutes.includes(url.toLowerCase());
};

appSever
    .use(async (ctx, next) => {
        console.log('APP URL: ', ctx.url);
        await next();
    })
    .use(async (ctx, next) => {
        if (!isRouteValid(ctx.url)) ctx.path = '/';

        await next();
    })
    .use(serveStatic(path.join(__dirname, '../app/build')))
    .use(cors())
    .listen(8081);
