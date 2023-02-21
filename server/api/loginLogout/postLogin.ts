import { Request, Response } from 'express';
import pool from '../../dbConnection';

const bcrypt = require('bcrypt');

exports.loginUserPost = async (req: Request, res: Response) => {
    try {
        let loginResponse = {
            continueLogin: false
        };

        //check db for user
        const username: string = req.body.userName.toUpperCase();
        const userPassword: string = req.body.userPassword;
        console.log(req.body);

        let storedUserId: string, storedUsername: string, storedPassword: string, storedEmail: string;

        const storedRecountSheepUser = await pool.query(`SELECT * FROM recountsheepusers WHERE user_username = '${username}'`);
        const serverUserData = storedRecountSheepUser.rows[0];
        if (serverUserData) {
            storedUserId = serverUserData.user_id;
            storedUsername = serverUserData.user_username;
            storedPassword = serverUserData.user_password;
            storedEmail = serverUserData.user_email;
            console.log('userexistsindb');
        } else {
            return res.send(loginResponse);
        }

        //authenticate user
        const match = await bcrypt.compare(userPassword, storedPassword);
        if (match) {
            req.session.user = {
                id: storedUserId,
                username: storedUsername,
                email: storedEmail
            };
            loginResponse = Object.assign({ session: req.session.user });
            loginResponse.continueLogin = true;
            console.log(loginResponse);
            res.send(loginResponse);
        } else {
            res.send(loginResponse);
        }
    } catch (err) {
        console.log(err);
    }
};
