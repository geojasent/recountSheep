import { Request, Response } from 'express';
import pool from '../../dbConnection';

exports.updateDreamEntryPost = async (req: Request, res: Response) => {
    try {
        const userId = req.session.user?.id;
        const dreamId = req.params.dreamId;
        const { date, dayOfWeek, timeToBed, timeAwake, people, dreamLocation, typeOfDream, dreamDescription } = req.body;
        console.log(userId);
        console.log(dreamId);
        console.log(req.body);

        const updateDream = await pool.query(
            `UPDATE dreamentry SET user_id = $1, day_of_month = $2, day_of_week = $3, time_to_bed = $4, time_awake = $5, people = $6, dream_location = $7, type_of_dream = $8, dream_description = $9 WHERE user_id = ${userId} AND dream_id = ${dreamId} RETURNING *`,
            [userId, date, dayOfWeek, timeToBed, timeAwake, people, dreamLocation, typeOfDream, dreamDescription]
        );
        res.json(updateDream.rowCount);
    } catch (err) {
        console.log(err);
    }
};
