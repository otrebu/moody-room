const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const ObjectId = mongodb.ObjectID;
const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'moody-room-db';

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

module.exports = {
    initDbClient: async () =>
        await MongoClient.connect(
            mongoUrl,
            { useNewUrlParser: true }
        ),
    initDb: dbClient => dbClient.db(dbName),
    calculatePrevalentMood: calculatePrevalentMood,
    elaborateMoodData: lastFaces => {
        let moodSummary = [];

        lastFaces.FaceDetails.forEach(faceDetail => {
            let prevalentMood = calculatePrevalentMood(faceDetail.Emotions);

            if (prevalentMood) {
                prevalentMood = { name: prevalentMood.Type.toLowerCase(), count: 1 };

                const prevalentMoodIndex = moodSummary.findIndex(
                    pm => pm.name === prevalentMood.name
                );

                if (prevalentMoodIndex === -1) {
                    moodSummary.push(prevalentMood);
                } else {
                    moodSummary[prevalentMoodIndex].count += 1;
                }
            }
            prevalentMood = null;
        });

        const commonMood = moodSummary.reduce(
            (accumulator, mood) => {
                console.log(accumulator);
                accumulator = mood.count > accumulator.count ? mood : accumulator;
                return accumulator;
            },
            { count: 0 }
        );

        const facialAttributes = lastFaces.FaceDetails.map(faceDetail => {
            let prevalentMood = calculatePrevalentMood(faceDetail.Emotions);
            if (prevalentMood) {
                return {
                    mood: prevalentMood.Type.toLowerCase(),
                    facialAttributes: {
                        hasBeard:
                            faceDetail.Beard.Value === true && faceDetail.Beard.Confidence > 90,
                        hasMoustache:
                            faceDetail.Mustache.Value === true &&
                            faceDetail.Mustache.Confidence > 90,
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

        const timestamp = ObjectId(lastFaces._id).getTimestamp();

        return { timestamp, commonMood, moodSummary, facialAttributes };
    }
};
