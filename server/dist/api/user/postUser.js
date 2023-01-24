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
const dbConnection_1 = __importDefault(require("../../dbConnection"));
const bcrypt = require('bcrypt');
exports.createUserPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const responseData = {
            userNameValid: false
        };
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
            const newUserDatabaseEntry = yield dbConnection_1.default.query('INSERT INTO recountsheepusers (user_username, user_password, user_email, user_role) VALUES ($1, $2, $3, $4) RETURNING *', [
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
});
