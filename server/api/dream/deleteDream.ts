import { Request, Response } from 'express';
import pool from '../../dbConnection';

exports.deleteDream = async (req: Request, res: Response) => {
    try {
        const userId = req.session.user?.id;
        const dreamId = req.params.dreamId;
        const deleteDream = await pool.query(`DELETE from dreamentry WHERE user_id = ${userId} AND  dream_id = ${dreamId}`);
        res.json(deleteDream.rowCount);
    } catch (err) {
        console.log(err);
    }
};
