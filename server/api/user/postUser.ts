import { Request, Response } from 'express';
import pool from '../../dbConnection';

const bcrypt = require('bcrypt');

exports.createUserPost = async (req: Request, res: Response) => {
    try {
        const responseData = {
            userNameValid: false
        };

        const userName = req.body.userName.toUpperCase();
        //hash and salt password
        const userPassword = req.body.userPassword;
        const hashedPassword = await bcrypt.hash(userPassword, 10);
        console.log(hashedPassword);
        const userEmail = req.body.userEmail;
        const userRole = '';

        console.log('starting async query');

        //check username
        let userExists = await pool.query(`SELECT exists (SELECT 1 FROM recountsheepusers WHERE user_username = '${userName}')`);
        if (!userExists.rows[0].exists) {
            const newUserDatabaseEntry = await pool.query('INSERT INTO recountsheepusers (user_username, user_password, user_email, user_role) VALUES ($1, $2, $3, $4) RETURNING *', [
                userName,
                hashedPassword,
                userEmail,
                userRole
            ]);
            res.send((responseData.userNameValid = true));
        } else {
            res.send((responseData.userNameValid = false));
        }
        console.log('async query finished');
    } catch (err) {
        console.log(err);
    }
};
