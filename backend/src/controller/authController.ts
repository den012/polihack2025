import admin from '../config/firebaseAdmin';
import { Request, Response } from 'express';
import * as express from 'express';

declare global {
    namespace Express {
        interface Request {
            userId?: string;
            user? : {
                name?: string;
                picture? :string;
                email?: string;
            };
        }
    }
}

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    const { token } = req.body;

    if(!token) {
        res.status(400).json({ message: "Token is required" });
        return;
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        const userId = decodedToken.uid;

        res.cookie('authToken', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 3 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({message: "User logged in successfully", userId});
    } catch(error) {
        console.error("Error verifying token:", error);
        res.status(401).json({ message: "Unauthorized, not authenticated" });
    }
}

export const getProtectedData = async(req: Request, res: Response): Promise<void> => {
    res.json({message: `Welcome, ${req.userId}!`});
}

export const getUserInfo = async (req: Request, res: Response): Promise<void> => {
    if(!req.user) {
        res.status(401).json({ message: "Unauthorized, not authenticated" });
        return;
    }

    const {name, picture, email} = req.user;
    res.json({name, picture, email});
}

export const logoutUser = async (req: Request, res: Response): Promise<void> => {
    res.clearCookie('authToken', {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/',
    });
    res.status(200).json({ message: "User logged out successfully" });
}