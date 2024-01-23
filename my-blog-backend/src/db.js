import { MongoClient } from "mongodb";
import fs from 'fs';

let db;

async function connectToDB(cb) {
    // Read the credentials json file
    const db_credentials = JSON.parse(
            fs.readFileSync(`${process.env.DB_CREDENTIALS_FILE}`)
        );

    const MONGO_USERNAME=db_credentials.mongo_user;
    const MONGO_PASSWORD=db_credentials.mongo_password;
    const MONGO_CONNECTION_STRING_PREFIX=db_credentials.mongo_connection_string_prefix;
    const MONGO_CONNECTION_STRING_SUFFIX=db_credentials.mongo_connection_string_suffix;

    // Connect to the database
    const client = new MongoClient(`${MONGO_CONNECTION_STRING_PREFIX}${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_CONNECTION_STRING_SUFFIX}`);

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