"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./router"));
const app = (0, express_1.default)();
const cors = require('cors');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const PORT = process.env.PORT || 5000;
//middleware
app.use(cors({ credentials: true, origin: 'https://recountsheep.com' }));
app.use(express_1.default.json());
app.set('trust proxy', 1);
app.use(session({
    store: new pgSession(),
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
        sameSite: 'none'
    }
}));
app.use('/', router_1.default);
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
    console.log(`⚡️[server]: Server is running on port ${PORT}`);
});
//on shutdown pool end??
