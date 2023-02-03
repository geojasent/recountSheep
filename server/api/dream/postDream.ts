import { Request, Response } from 'express';
import pool from '../../dbConnection';

exports.createDreamEntryPost = async (req: Request, res: Response) => {
    try {
        const userId = req.session.user?.id;
        const { date, dayOfWeek, timeToBed, timeAwake, people, dreamLocation, typeOfDream, dreamDescription } = req.body;

        const newDreamEntry = await pool.query(
            'INSERT INTO dreamentry (user_id, day_of_month, day_of_week, time_to_bed, time_awake, people, dream_location, type_of_dream, dream_description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
            [userId, date, dayOfWeek, timeToBed, timeAwake, people, dreamLocation, typeOfDream, dreamDescription]
        );
        res.json(newDreamEntry.rows[0]);
    } catch (err) {
        console.log(err);
    }
};
