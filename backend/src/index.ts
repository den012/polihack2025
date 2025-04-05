import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

//database
// import db from './database/database';

import authRoutes from './routes/authRoutes';

//routes

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT;

app.use(cors());
  

app.use(cookieParser());


app.use('/api/auth', authRoutes);

// app.get('/getWords', async (req, res) => {
//     try {
//         const [rows] = await db.query('SELECT * FROM words'); // Use promise-based query
//         res.json(rows);
//     } catch (error) {
//         console.error('Error fetching words:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

// app.post('/addWord', async (req, res): Promise<void> => {
//     const { word } = req.body;
//     if (!word) {
//         res.status(400).json({ message: 'Word is required' });
//         return;
//     }

//     try {
//         await db.query('INSERT INTO words (text) VALUES (?)', [word]); // Use promise-based query
//         res.sendStatus(201);
//     } catch (error) {
//         console.error('Error adding word:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
