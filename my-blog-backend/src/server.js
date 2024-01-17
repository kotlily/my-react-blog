import fs from 'fs';
import path from 'path';
import admin from 'firebase-admin';
import express from "express";
import 'dotenv/config';
import { db, connectToDB } from './db.js';

// when type module is used in package.json, __dirname and __filename are not defined
// Hence we need to use the following code to get the directory name and file name
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const credentials = JSON.parse(
    fs.readFileSync('./credentials.json')
);
admin.initializeApp({
    credential: admin.credential.cert(credentials),
});

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '../build')));

// This is a catch all for any other GET request whcih are not API calls
// This is needed for react router to work properly and for the app to be able to send user to the index.html page
app.get(/^(?!\/api).+/, (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.use(async (req, res, next) => {
    const { authtoken } = req.headers;

    if (authtoken) {
        try {
            req.user = await admin.auth().verifyIdToken(authtoken);
        } catch (e) {
            return res.sendStatus(400);
        }   
    }

    req.user = req.user || {};

    next();    
});

app.get('/api/articles/:name', async (req, res) => {
    const { name } = req.params;
    const { uid } = req.user;

    const article = await db.collection('articles').findOne({ name });

    if (article) {
        const upvoteIds = article.upvoteIds || [];
        article.canUpvote = uid && !upvoteIds.includes(uid);
        res.json(article);
    } else {
        //res.sendStatus(404);
        res.send('That article does not exist');
    }
});


app.use((req, response, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
});

app.put('/api/articles/:name/upvote', async (req, res) =>  {
    const { name } = req.params;
    const { uid } = req.user;

    const article = await db.collection('articles').findOne({ name });

    if (article) {
        const upvoteIds = article.upvoteIds || [];
        const canUpvote = uid && !upvoteIds.includes(uid);

        if (canUpvote) {
            await db.collection('articles').updateOne({ name }, {
                $inc: { upvotes: 1},  // increment upvotes by 1
                $push: { upvoteIds: uid },
            });
        }

        const updatedArticle = await db.collection('articles').findOne({ name });
        res.json(updatedArticle);
    } else {
        //res.sendStatus(404);
        res.send('That article does not exist');
    }
});

app.post('/api/articles/:name/comments', async (req, res) => {
    const { name } = req.params;
    const { text } = req.body;
    const { email } = req.user;

    await db.collection('articles').updateOne({ name }, {
        $push: { comments: { postedBy: email, text }},  // add new comment
    });

    const article = await db.collection('articles').findOne({ name });

    if (article) {
        res.json(article);
    } else {
        //res.sendStatus(404);
        res.send('That article does not exist');
    }
});

const SERVER_PORT = process.env.SERVER_PORT || 8000;

connectToDB(() => {
    console.log('Successfully connect to database');
    app.listen(SERVER_PORT, () => {
        console.log('Server is listening on port ' + SERVER_PORT)
    });
});
