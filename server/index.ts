import express, { Express, Request, Response } from 'express';
import connectDb from './dbConnection';

const app: Express = express();
const cors = require('cors');

const PORT = process.env.PORT || 5000;
//middleware
app.use(cors());
app.use(express.json());

//ROUTES

//add dream to db
app.post('/dreamEntry', async (req: Request, res: Response) => {
    try {
        console.log(req.body);
    } catch (err) {
        console.log(err);
    }
});

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

app.listen(PORT, () => {
    // console.log('Server has started on port', PORT)
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
