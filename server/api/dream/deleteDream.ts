import { Request, Response } from 'express';
import pool from '../../dbConnection';

exports.deleteDream = async (req: Request, res: Response) => {
    try {
        const userId = req.session.user?.id;
        console.log(req.params.dream_id);
        console.log(userId);
        // const deleteDream = await pool.query('');
    } catch (err) {
        console.log(err);
    }
};
