import express, { Express, Request, Response } from 'express';
import router from './router';

const app: Express = express();
const cors = require('cors');

const PORT = process.env.PORT || 5000;
//middleware
app.use(cors());
app.use(express.json());

app.use('/', router);

// //get homepage
// app.get('/', (req: Request, res: Response) => {
//     res.send('Express + TypeScript Server');
// });

// //get dreams
// app.get('/viewdreams', (req: Request, res: Response) => {
//     res.send('View submmitted dreams');
// });

// //update dream

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});

//on shutdown pool end??
