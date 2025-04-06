import { Request, Response } from 'express';
import db from '../database/database';
import chalk from 'chalk';

let usersCount = 0;

export const googleAuth = (req: Request, res: Response): void => {
    const { name, email } = req.body;

    usersCount++;
    // console.log(req.body);
    console.log(chalk.bgBlack("Received user data:", name, email));
    console.log(chalk.cyan("Total users:", usersCount));

    res.status(200).json({ message: "User data received", name, email });
};
