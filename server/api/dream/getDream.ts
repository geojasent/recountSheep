import { Request, Response } from 'express';
import pool from '../../dbConnection';

export default async function getDream(req: Request, res: Response) {
    try {
        //TODO implement query with date range and search
        const sessionId = req.session.user?.id;
        //if get request is search do a different query
        const storedDreams = await pool.query(
            `SELECT dream_id, day_of_month, day_of_week, time_to_bed, time_awake, people, dream_location, type_of_dream, dream_description FROM dreamentry WHERE user_id = ${sessionId}`
        );
        res.send(storedDreams.rows);
    } catch (err) {
        console.log(err);
        //res no dreams to display
    }
}
