import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import { Request, Response } from 'express';

//database
import db from './database/database';

import authRoutes from './routes/authRoutes';
import eventRoutes from './routes/eventRoutes';

//routes

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT;


app.use(cors());
<<<<<<< HEAD
  
  
app.get('/getWords', (req, res) => {
    res.header("Access-Control-Allow-Origin", "https://polihack2025-git-develop-denis-projects-98d0ab60.vercel.app");
    res.header("Access-Control-Allow-Methods", "GET");

    // Your code to handle the request
    res.json({ message: 'Words data' });
});

  
=======
>>>>>>> b2d97b65524cf93f75231529793caadc9a517d23

app.use(cookieParser());

// app.get('/getWords', async (req: Request, res: Response) => {
//     try {
//         const [rows] = await db.query('SELECT * FROM words');
//         res.status(200).json(rows);
//     } catch (error) {
//         console.error('Error fetching words:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// })

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
