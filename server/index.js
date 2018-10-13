const Koa = require('koa');
const koaBody = require('koa-body');
const fs = require('fs');
const path = require('path');
const apiRouter = require('./apiRouter.js');

const app = new Koa();
const rekognition = new AWS.Rekognition();

app.use(async (ctx, next) => {
    console.log('URL: ', ctx.url);

    return await next();
});

app.use(koaBody({ multipart: true, jsonLimit: '30mb', formLimit: '30mb' }));
app.use(piApiRouter.middleware());
app.use(apiRouter.middleware());

app.listen(8080);
