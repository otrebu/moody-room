const Koa = require('koa');
const koaBody = require('koa-body');
const fs = require('fs');
const path = require('path');

const app = new Koa();

app.use(koaBody({ multipart: true, jsonLimit: '30mb', formLimit: '30mb' }));

app.use(async (ctx, next) => {
    console.log('URL: ', ctx.url);

    return await next();
});

app.use(async (ctx, next) => {
    const { headers, files } = ctx.request;

    console.log(ctx.url);

    if (ctx.method !== 'POST' && ctx.url !== 'picture-receiver')
        return await next();

    console.log(JSON.stringify(headers));
    console.log(JSON.stringify(ctx.request));

    const { file } = files;
    const reader = fs.createReadStream(file.path);
    const stream = fs.createWriteStream(path.join('./uploads', file.name));

    reader.pipe(stream);

    console.log('uploading %s -> %s', file.name, stream.path);
});

app.listen(8080);
