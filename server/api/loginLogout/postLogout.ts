import { Request, Response } from 'express';

exports.logoutUserPost = async (req: Request, res: Response) => {
    //delete session in db
    req.session.destroy(function (err) {
        if (err) {
            console.log(err);
        } else {
            res.clearCookie('connect.sid').send({ clearSession: 'success' });
        }
    });
};
