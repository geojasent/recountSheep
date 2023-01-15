import express, { Express, Request, Response } from 'express';
// import connectDb from './dbConnection';
import pool from './dbConnection';

const app: Express = express();
const cors = require('cors');

const PORT = process.env.PORT || 5000;
//middleware
app.use(cors());
app.use(express.json());

//ROUTES

//add dream
app.post('/dreamentry', async (req: Request, res: Response) => {
    try {
        console.log(req.body);
        const userId = req.body.userId;
        const dayOfMonth = req.body.dayOfMonth;
        const dayOfWeek = req.body.dayOfMonth;
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

        console.log('calling end');
        await pool.end();
        console.log('pool has drained');
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
