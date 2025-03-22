require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;

let db;

const initDb = (callback) => {
    if (db) {
        console.log("Database is already initialized...");
        return callback(null, db);
    }

    MongoClient.connect(process.env.MONGO_URI)
        .then((client) => {
            db = client;
            callback(null, db)
        })
        .catch((err) => {
            callback(err);
        });
};


const getDatabase = () => {
    if (!db) {
        throw new Error("Database not initialized...");
    }

    return db;
};

module.exports = {
    initDb,
    getDatabase
}

