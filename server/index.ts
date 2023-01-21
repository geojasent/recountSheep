import express, { Express, Request, Response } from 'express';
// import connectDb from './dbConnection';
import pool from './dbConnection';

const app: Express = express();
const cors = require('cors');
const bcrypt = require('bcrypt');

const PORT = process.env.PORT || 5000;
//middleware
app.use(cors());
app.use(express.json());

// const http = require('http');
// const https = require('https');
// const fs = require('fs');

// const options = {
//     key: fs.readFileSync('../cert/CA/localhost/localhost.decrypted.key'),
//     cert: fs.readFileSync('../cert/CA/localhost/localhost.crt')
// };

// http.createServer(app);
// https
//     .createServer(options, app, (req: Request, res: Response) => {
//         res.writeHead(200);
//         res.end(`Server is running at http://localhost:${PORT}`);
//     })
//     .listen(PORT);

//ROUTES

//create user
app.post('/signup', async (req: Request, res: Response) => {
    try {
        console.log(req.body);
        const userName = req.body.userName;

        //hash and salt password
        const userPassword = req.body.userPassword;
        const hashedPassword = await bcrypt.hash(userPassword, 10);
        console.log(hashedPassword);
        const userEmail = req.body.userEmail;
        const userRole = '';

        console.log('starting async query');
        const newUserEntry = await pool.query('INSERT INTO recountsheepusers (user_username, user_password, user_email, user_role) VALUES ($1, $2, $3, $4) RETURNING *', [
            userName,
            hashedPassword,
            userEmail,
            userRole
        ]);
        res.json(newUserEntry);
        console.log('async query finished');
    } catch (err) {
        console.log(err);
        res.redirect('/signup');
    }
}).listen(443);

//add dream
app.post('/dreamentry', async (req: Request, res: Response) => {
    try {
        console.log(req.body);
        const userId = req.body.userId;
        const dayOfMonth = req.body.dayOfMonth;
        const dayOfWeek = req.body.dayOfWeek;
        const timeToBed = req.body.timeToBed;
        const timeAwake = req.body.timeAwake;
        const people = req.body.people;
        const dreamLocation = req.body.dreamLocation;
        const typeOfDream = req.body.typeOfDream;
        const dreamDescription = req.body.dreamDescription;

        console.log('starting async query');
        const newDreamEntry = await pool.query(
            'INSERT INTO dreamentry (user_id, day_of_month, day_of_week, time_to_bed, time_awake, people, dream_location, type_of_dream, dream_description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
            [userId, dayOfMonth, dayOfWeek, timeToBed, timeAwake, people, dreamLocation, typeOfDream, dreamDescription]
        );
        res.json(newDreamEntry.rows[0]);
        console.log('async query finished');
    } catch (err) {
        console.log(err);
    }
});

//get homepage
app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

//get dreams
app.get('/viewdreams', (req: Request, res: Response) => {
    res.send('View submmitted dreams');
});

//update dream

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});

//on logout pool end
