const Router = require('koa-router');
const router = new Router({ prefix: '/pi' });
const fs = require('fs');
const util = require('util');
const rekognition = require('./rekognition.js');
const { initDbClient, initDb } = require('./dataService');
const readFile = util.promisify(fs.readFile);

router.get('/hello', async (ctx, next) => {
    ctx.body = `Hello world!`;
    return await next();
});

router.post('/picture-receiver', async (ctx, next) => {
    const { file } = ctx.request.files;

    rekognition.detectFaces(
        {
            Attributes: ['ALL'],
            Image: {
                Bytes: await readFile(file.path)
            }
        },
        async (err, data) => {
            if (err) {
                console.log(err, err.stack);
            } else {
                try {
                    const jsonData = JSON.stringify(data);
                    console.log(jsonData);

                    const dbClient = await initDbClient();
                    const db = initDb(dbClient);
                    const facesCollection = await db.collection('faces');
                    await facesCollection.insertOne(data);

                    console.log(await facesCollection.find({}).toArray());

                    dbClient.close();
                } catch (error) {
                    console.error(error);
                }
            }
            return await next();
        }
    );
});

exports.piApiRouter = router;
