import { Request, Response } from 'express';
import db from '../database/database';
import chalk from 'chalk';

let usersCount = 0;

export const googleAuth = async (req: Request, res: Response): Promise<void> => {
    const { name, email, uid, photo } = req.body;

    try {
        await db.query('INSERT INTO User(id, name, email, photo) VALUES(?, ?, ?, ?)', [uid, name, email, photo]);

        usersCount++;
        // console.log(req.body);
        console.log(chalk.bgBlack("Received user data:", name, email, uid, photo));
        console.log(chalk.cyan("Total users:", usersCount));

        res.status(200).json({ message: "User data received", name, email, uid, photo});
    } catch (error) {
        console.error(chalk.red("Error inserting user data: ", error));
        res.status(500).json({message : "Failed to store used data", error : error instanceof Error ? error.message : "Unknown error"})
    }
};
