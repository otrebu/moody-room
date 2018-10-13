const MongoClient = require('mongodb').MongoClient;

const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'moody-room-db';

module.exports = {
    initDbClient: async () =>
        await MongoClient.connect(
            mongoUrl,
            { useNewUrlParser: true }
        ),
    initDb: dbClient => dbClient.db(dbName)
};
