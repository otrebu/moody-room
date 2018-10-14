const Router = require('koa-router');
const router = new Router({ prefix: '/pi' });
const fs = require('fs');
const util = require('util');
const rekognition = require('./rekognition.js');
const { initDbClient, initDb, elaborateMoodData } = require('./dataService');
const readFile = util.promisify(fs.readFile);
var lifx = require('lifx-http-api');

const client = new lifx({
    bearerToken: 'c00033299035cd9fb23d71440b561689301ba07792a4408a20144d0a57f21143'
});

router.get('/hello', async (ctx, next) => {
    ctx.body = `Hello world!`;
    return await next();
});

const matchColorWithMood = moodName => {
    let colour = '#232526';

    switch (moodName) {
        case 'sad':
            colour = '#243b55';
            break;
        case 'sad':
            colour = '#243b55';
            break;
        case 'angry':
            colour = '#c31432';
            break;
        case 'confused':
            colour = '#71b280';
            break;
        case 'disgusted':
            colour = '#1d4350';
            break;
        case 'surprised':
            colour = '#7303c0';
            break;
        case 'calm':
            colour = '#076585';
            break;
    }

    return colour;
};

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

                    const { commonMoodName } = elaborateMoodData(data);

                    client
                        .setState('all', {
                            power: 'on',
                            color: matchColorWithMood(commonMoodName),
                            brightness: 0.5,
                            duration: 5
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
