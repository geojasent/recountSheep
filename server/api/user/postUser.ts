import { Request, Response } from 'express';
import pool from '../../dbConnection';

const bcrypt = require('bcrypt');

exports.createUserPost = async (req: Request, res: Response) => {
    try {
        let responseData = {
            userNameInvalid: false,
            userEmailInvalid: false,
            userValid: false
        };

        const username = req.body.userName.toUpperCase();
        //hash and salt password
        const userPassword = req.body.userPassword;
        const hashedPassword = await bcrypt.hash(userPassword, 10);
        const userEmail = req.body.userEmail;
        const userRole = '';

        //check db for username
        let userExists = await pool.query(`SELECT exists (SELECT 1 FROM recountsheepusers WHERE user_username = '${username}')`);
        //check db for email
        let emailExists = await pool.query(`SELECT exists (SELECT 1 FROM recountsheepusers WHERE user_email = '${userEmail}')`);

        if (!userExists.rows[0].exists && !emailExists.rows[0].exists) {
            const newUserDatabaseEntry = await pool.query('INSERT INTO recountsheepusers (user_username, user_password, user_email, user_role) VALUES ($1, $2, $3, $4) RETURNING *', [
                username,
                hashedPassword,
                userEmail,
                userRole
            ]);

            req.session.user = {
                username: username,
                email: userEmail
            };
            responseData = Object.assign({ session: req.session.user });
            responseData.userValid = true;
        } else if (userExists.rows[0].exists && !emailExists.rows[0].exists) {
            responseData.userNameInvalid = true;
        } else if (!userExists.rows[0].exists && emailExists.rows[0].exists) {
            responseData.userEmailInvalid = true;
        } else {
            responseData.userValid = false;
        }
        res.send(responseData);
    } catch (err) {
        console.log(err);
    }
};
