import { Request, Response } from 'express';
import db from '../database/database';

export const googleAuth = (req: Request, res: Response): void => {
    const { name, email } = req.body;
    // console.log(req.body);
    console.log("Received user data:", name, email);

    res.status(200).json({ message: "User data received", name, email });
};
