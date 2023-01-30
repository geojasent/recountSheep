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
exports.loginUserPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let loginResponse = {
            continueLogin: false
        };
        //check db for user
        const username = req.body.userName.toUpperCase();
        const userPassword = req.body.userPassword;
        let storedUserId, storedUsername, storedPassword, storedEmail;
        const storedRecountSheepUser = yield dbConnection_1.default.query(`SELECT * FROM recountsheepusers WHERE user_username = '${username}'`);
        const serverUserData = storedRecountSheepUser.rows[0];
        if (serverUserData) {
            storedUserId = serverUserData.user_id;
            storedUsername = serverUserData.user_username;
            storedPassword = serverUserData.user_password;
            storedEmail = serverUserData.user_email;
        }
        else {
            return res.send(loginResponse);
        }
        //authenticate user
        const match = yield bcrypt.compare(userPassword, storedPassword);
        if (match) {
            req.session.user = {
                id: storedUserId,
                username: storedUsername,
                email: storedEmail
            };
            loginResponse = Object.assign({ session: req.session.user });
            loginResponse.continueLogin = true;
            res.send(loginResponse);
        }
        else {
            res.send(loginResponse);
        }
    }
    catch (err) {
        console.log(err);
    }
});
