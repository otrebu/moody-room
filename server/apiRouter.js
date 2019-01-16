const Router = require('koa-router');
const {
    initDbClient,
    initDb,
    elaborateMoodData,
    createMoodSummary
} = require('./dataService');

const router = new Router({ prefix: '/api' });

router.get('/hello', async (ctx, next) => {
    ctx.body = 'Hello world';
    await next();
});

router.get('/moods/current', async (ctx, next) => {
    const dbClient = await initDbClient();
    const db = initDb(dbClient);
    const facesCollection = await db.collection('faces');

    const lastFaces = await facesCollection
        .find()
        .sort({ $natural: -1 })
        .limit(1)
        .next();

    dbClient.close();

    ctx.body = lastFaces ? elaborateMoodData(lastFaces) : null;

    return await next();
});

router.get('/moods/hackathon', async (ctx, next) => {
    const dbClient = await initDbClient();
    const db = initDb(dbClient);
    const hackathonFacesCollection = await db.collection('hackathonFaces');

    const lastNTimeframeFaces = (await hackathonFacesCollection
        .find()
        .sort({ $natural: -1 })
        .toArray()).reverse();

    const elaboratedMoodDataForNTimeFrames = lastNTimeframeFaces.map(faces =>
        elaborateMoodData(faces)
    );

    ctx.body = {
        moodTimeFrames: elaboratedMoodDataForNTimeFrames
    };

    return await next();
});

router.get('/moods/last/:n', async (ctx, next) => {
    const dbClient = await initDbClient();
    const db = initDb(dbClient);
    const facesCollection = await db.collection('faces');

    const lastNTimeframeFaces = (await facesCollection
        .find()
        .sort({ $natural: -1 })
        .limit(parseInt(ctx.params.n))
        .toArray()).reverse();

    const elaboratedMoodDataForNTimeFrames = lastNTimeframeFaces.map(faces => {
        const d = elaborateMoodData(faces);
        return d;
    });

    ctx.body = {
        moodTimeFrames: elaboratedMoodDataForNTimeFrames
    };

    return await next();
});

exports.apiRouter = router;
