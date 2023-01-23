"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import connectDb from './dbConnection';
const dbConnection_1 = __importDefault(require("./dbConnection"));
const app = (0, express_1.default)();
const cors = require('cors');
const bcrypt = require('bcrypt');
const PORT = process.env.PORT || 5000;
//middleware
app.use(cors());
app.use(express_1.default.json());
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
app.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const responseData = {
            userNameValid: false
        };
        console.log(req.body);
        const userName = req.body.userName.toUpperCase();
        //hash and salt password
        const userPassword = req.body.userPassword;
        const hashedPassword = yield bcrypt.hash(userPassword, 10);
        console.log(hashedPassword);
        const userEmail = req.body.userEmail;
        const userRole = '';
        console.log('starting async query');
        //check username
        let userExists = yield dbConnection_1.default.query(`SELECT exists (SELECT 1 FROM recountsheepusers WHERE user_username = '${userName}')`);
        if (!userExists.rows[0].exists) {
            const newUserEntry = yield dbConnection_1.default.query('INSERT INTO recountsheepusers (user_username, user_password, user_email, user_role) VALUES ($1, $2, $3, $4) RETURNING *', [
                userName,
                hashedPassword,
                userEmail,
                userRole
            ]);
            res.send((responseData.userNameValid = true));
        }
        else {
            res.send((responseData.userNameValid = false));
        }
        console.log('async query finished');
    }
    catch (err) {
        console.log(err);
    }
}));
//add dream
app.post('/dreamentry', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const newDreamEntry = yield dbConnection_1.default.query('INSERT INTO dreamentry (user_id, day_of_month, day_of_week, time_to_bed, time_awake, people, dream_location, type_of_dream, dream_description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *', [userId, dayOfMonth, dayOfWeek, timeToBed, timeAwake, people, dreamLocation, typeOfDream, dreamDescription]);
        res.json(newDreamEntry.rows[0]);
        console.log('async query finished');
    }
    catch (err) {
        console.log(err);
    }
}));
//get homepage
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
//get dreams
app.get('/viewdreams', (req, res) => {
    res.send('View submmitted dreams');
});
//update dream
app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
//on logout pool end
