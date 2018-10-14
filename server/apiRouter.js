const Router = require('koa-router');
const { initDbClient, initDb } = require('./dataService');
const router = new Router({ prefix: '/api' });

const calculatePrevalentMood = emotions => {
    let prevalentMood = null;

    emotions.forEach(emotion => {
        if (!prevalentMood) {
            prevalentMood = emotion;
        }
        if (emotion.Type !== prevalentMood.Type && emotion.Confidence > prevalentMood.Confidence) {
            prevalentMood = emotion;
        }
    });

    return prevalentMood;
};

router.get('/current-moods', async (ctx, next) => {
    const dbClient = await initDbClient();
    const db = initDb(dbClient);
    const facesCollection = await db.collection('faces');

    const lastFaces = await facesCollection
        .find()
        .sort({ $natural: -1 })
        .limit(1)
        .next();

    let moodSummary = [];

    lastFaces.FaceDetails.forEach(faceDetail => {
        let prevalentMood = calculatePrevalentMood(faceDetail.Emotions);
        if (prevalentMood) {
            prevalentMood = { name: prevalentMood.Type.toLowerCase(), count: 1 };

            const doesSummaryContainsThisMood = moodSummary.filter(
                m => m.name === prevalentMood.name
            ).length;

            if (!doesSummaryContainsThisMood) {
                moodSummary.push(prevalentMood);
            } else {
                const prevalentMoodIndex = moodSummary.findIndex(
                    pm => pm.name === prevalentMood.name
                );
                if (prevalentMoodIndex >= 0) {
                    moodSummary[prevalentMoodIndex].count += 1;
                }
            }
        }
    });

    const facialAttributes = lastFaces.FaceDetails.map(faceDetail => {
        let prevalentMood = calculatePrevalentMood(faceDetail.Emotions);
        if (prevalentMood) {
            return {
                mood: prevalentMood.Type.toLowerCase(),
                facialAttributes: {
                    hasBeard: faceDetail.Beard.Value === true && faceDetail.Beard.Confidence > 90,
                    hasMoustache:
                        faceDetail.Mustache.Value === true && faceDetail.Mustache.Confidence > 90,
                    hasSunglasses:
                        faceDetail.Sunglasses.Value === true &&
                        faceDetail.Sunglasses.Confidence > 90,
                    hasGlasses:
                        faceDetail.Eyeglasses.Value === true &&
                        faceDetail.Eyeglasses.Confidence > 90
                }
            };
        }
    }).filter(facialAttribute => facialAttribute !== undefined);

    const commonMoodName = moodSummary.reduce(
        (accumulator, mood) => {
            console.log(accumulator);
            accumulator = mood.count > accumulator.count ? mood : accumulator;
            return accumulator;
        },
        { count: 0 }
    );

    dbClient.close();

    ctx.body = { commonMoodName, moodSummary, facialAttributes, lastFaces };

    return await next();
});

exports.apiRouter = router;
