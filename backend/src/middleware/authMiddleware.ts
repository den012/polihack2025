import admin from '../config/firebaseAdmin';
import { Request, Response, NextFunction } from 'express';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
        const token = req.headers.authorization?.replace('Bearer ', '');

        if(!token) {
            res.status(403).send('A token is required for authentication');
            return;
        }

        const decodedToken = await admin.auth().verifyIdToken(token);

        //set userId
        req.userId = decodedToken.uid;
        //set user details on request
        req.user = {
            name: decodedToken.name || '',
            email: decodedToken.email || '',
            picture: decodedToken.picture || ''
        };
        
        next();
    } catch(error) {
        console.log('Auth middleware error: ', error);
        res.status(401).json({error: 'Unauthorized'});
    }
};