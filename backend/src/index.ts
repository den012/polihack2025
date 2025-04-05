import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

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
  

app.use(cookieParser());


app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
