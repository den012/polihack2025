import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

//routes
import authRoutes from './routes/authRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(helmet());
app.use(helmet.crossOriginOpenerPolicy({ policy: 'same-origin' }));
app.use(cors({
    origin: [
        process.env.FRONTEND_URL || '',
        'https://lh3.googleusercontent.com',
        'http://localhost:8080',
    ],
    credentials : true
}));

app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('Hello world!');
})


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
