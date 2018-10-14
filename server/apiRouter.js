const Router = require('koa-router');
const { initDbClient, initDb, elaborateMoodData } = require('./dataService');
const router = new Router({ prefix: '/api' });

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

    ctx.body = lastNTimeframeFaces.map(faces => elaborateMoodData(faces));

    return await next();
});

exports.apiRouter = router;
