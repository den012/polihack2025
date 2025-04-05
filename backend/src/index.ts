import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/authRoutes';

//routes

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT;

app.use(cors());
  

app.use(cookieParser());


app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('Hello world!');
})


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
