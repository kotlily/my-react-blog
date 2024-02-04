import { MongoClient } from "mongodb";
import fs from 'fs';

let db;

async function connectToDB(cb) {

    const MONGO_USERNAME=process.env.MONGO_USERNAME;
    const MONGO_PASSWORD=process.env.MONGO_PASSWORD;
    const MONGO_CONNECTION_STRING_PREFIX=process.env.MONGO_CONNECTION_STRING_PREFIX;
    const MONGO_CONNECTION_STRING_CLUSTER_URL=process.env.MONGO_CONNECTION_STRING_CLUSTER_URL;
    const MONGO_CONNECTION_STRING_OPTIONS=process.env.MONGO_CONNECTION_STRING_OPTIONS;

    // Connect to the database
    const client = new MongoClient(`${MONGO_CONNECTION_STRING_PREFIX}${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_CONNECTION_STRING_CLUSTER_URL}?${MONGO_CONNECTION_STRING_OPTIONS}`);

    try {
        await client.connect();
    } catch (e) {
        console.error(e);
    }

    // Set the database.  Same as doing 'use react-blog-db in mongosh
    db = client.db(`${process.env.MONGO_DB_NAME}`);
    cb();
}

export {
    db,
    connectToDB
}