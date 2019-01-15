const Router = require('koa-router');
const { initDbClient, initDb, elaborateMoodData } = require('./dataService');

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

    ctx.body = elaborateMoodData(lastFaces);

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

    const moodSummaryForNTimeFrames = [];

    elaboratedMoodDataForNTimeFrames.forEach(elaboratedMoodData => {
        const { moodSummary } = elaboratedMoodData;

        moodSummary.forEach(mood => {
            const moodIndex = moodSummaryForNTimeFrames.findIndex(
                pm => pm.name === mood.name
            );

            if (moodIndex === -1) {
                moodSummaryForNTimeFrames.push({
                    name: mood.name,
                    count: mood.count
                });
            } else {
                moodSummaryForNTimeFrames[moodIndex].count += 1;
            }
        });
    });

    ctx.body = {
        moodTimestampSummary: moodSummaryForNTimeFrames,
        moodTimeFrames: elaboratedMoodDataForNTimeFrames
    };

    return await next();
});

exports.apiRouter = router;
