const Router = require('koa-router');
const fs = require('fs');
const lifx = require('lifx-http-api');
const util = require('util');
const rekognition = require('./rekognition.js');
const { initDbClient, initDb, elaborateMoodData } = require('./dataService');

const readFile = util.promisify(fs.readFile);

const router = new Router({ prefix: '/pi' });

const client = new lifx({
    bearerToken: 'c00033299035cd9fb23d71440b561689301ba07792a4408a20144d0a57f21143'
});

router.get('/hello', async (ctx, next) => {
    ctx.body = `Hello world!`;
    return await next();
});

const matchColorWithMood = moodName => {
    switch (moodName) {
        case 'happy':
            return '#ffff00';
        case 'sad':
            return '#3366cc';
        case 'angry':
            return '#ff0000';
        case 'confused':
            return '#71b280';
        case 'disgusted':
            return '#295e70';
        case 'surprised':
            return '#7303c0';
        case 'calm':
            return '#86dcf9';
        case 'unknown':
            return '#664400';
        default:
    }

    return '#664400';
};

router.post('/post-file', async (ctx, next) => {
    const { file } = ctx.request.files;
    console.log('​ctx.request', ctx.request);
    console.log('​file', file);
    ctx.body = `/post-file`;

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

                    const { commonMood } = elaborateMoodData(data);
                    console.log('commonMoodName', commonMood);
                    const moodColour = matchColorWithMood(commonMood.name);
                    console.log('moodColour', moodColour);
                    client
                        .setState('all', {
                            power: 'on',
                            color: moodColour,
                            brightness: 1,
                            duration: 20
                        })
                        .then(console.log, console.error);

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
