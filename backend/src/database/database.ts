import mysql from 'mysql2';
import chalk from 'chalk';
import dotenv from 'dotenv';

dotenv.config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : undefined,
});

db.connect((err) => {
    if(err) {
        console.error(chalk.red('Error connecting to the database:', err));
    }
    else {
        console.log(chalk.green('Connected to the database'));
    }
})

export default db;