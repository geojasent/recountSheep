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
        let responseData = {
            userNameInvalid: false,
            userEmailInvalid: false,
            userValid: false
        };
        const username = req.body.userName.toUpperCase();
        //hash and salt password
        const { userPassword, userEmail } = req.body;
        const hashedPassword = yield bcrypt.hash(userPassword, 10);
        const userRole = '';
        //check db for username
        let userExists = yield dbConnection_1.default.query(`SELECT exists (SELECT 1 FROM recountsheepusers WHERE user_username = '${username}')`);
        //check db for email
        let emailExists = yield dbConnection_1.default.query(`SELECT exists (SELECT 1 FROM recountsheepusers WHERE user_email = '${userEmail}')`);
        if (!userExists.rows[0].exists && !emailExists.rows[0].exists) {
            const newUserDatabaseEntry = yield dbConnection_1.default.query('INSERT INTO recountsheepusers (user_username, user_password, user_email, user_role) VALUES ($1, $2, $3, $4) RETURNING *', [
                username,
                hashedPassword,
                userEmail,
                userRole
            ]);
            // req.session.user = {
            //     username: username,
            //     email: userEmail
            // };
            // responseData = Object.assign({ session: req.session.user });
            responseData.userValid = true;
        }
        else if (userExists.rows[0].exists && !emailExists.rows[0].exists) {
            responseData.userNameInvalid = true;
        }
        else if (!userExists.rows[0].exists && emailExists.rows[0].exists) {
            responseData.userEmailInvalid = true;
        }
        else {
            responseData.userValid = false;
        }
        res.send(responseData);
    }
    catch (err) {
        console.log(err);
    }
});
