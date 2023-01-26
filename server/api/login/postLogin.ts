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
        let storedUsername: string, storedPassword: string, storedEmail: string;

        const storedRecountSheepUser = await pool.query(`SELECT * FROM recountsheepusers WHERE user_username = '${username}'`);
        if (storedRecountSheepUser.rows[0]) {
            storedUsername = storedRecountSheepUser.rows[0].user_username;
            storedPassword = storedRecountSheepUser.rows[0].user_password;
            storedEmail = storedRecountSheepUser.rows[0].user_email;
        } else {
            return res.send(loginResponse);
        }

        //authenticate user
        const match = await bcrypt.compare(userPassword, storedPassword);
        if (match) {
            req.session.user = {
                username: storedUsername,
                email: storedEmail
            };
            loginResponse = Object.assign({ session: req.session.user });
            loginResponse.continueLogin = true;
            res.send(loginResponse);
        } else {
            res.send(loginResponse);
        }
    } catch (err) {
        console.log(err);
    }
};
