import { MongoClient } from "mongodb";

let db;

async function connectToDB(cb) {
    //const client = new MongoClient('mongodb://127.0.0.1:27017');
    const client = new MongoClient(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@ilya-blog-db.ae74fjs.mongodb.net/?retryWrites=true&w=majority`);

    try {
        await client.connect();
    } catch (e) {
        console.error(e);
    }

    db = client.db('react-blog-db'); // same as doing 'use react-blog-db in mongosh
    cb();
}

export {
    db,
    connectToDB
}