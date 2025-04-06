import {Request, Response} from 'express';
import db from '../database/database';
import mysql from 'mysql2/promise';

interface Event {
    id: number;
    name: string
    description: string;
    image: string;
    date: string;
    price: number;
    location: string;
    organizer: string;
    category: string;

}

export const getAllEvents = async (req: Request, res: Response): Promise<void> => {
    try {
        const [results] = await db.query("SELECT * FROM Events")
        // console.log("All events fetched");
        res.json(results);
        return;
    } catch (error) {
        console.error("Error fetching events: ", error);
        res.status(500).json({ error: "Internal server error" });
        return;
    }

}

export const getPromotedEvent = async (req: Request, res: Response): Promise<void> => {
    try {
        const [results] = await db.query("SELECT * FROM Events WHERE promoted = 1");
        // console.log("Promoted events fetched")
        res.json(results);
        return;
    } catch (error) {
        console.error("Error fetching promoted events: ", error);
        res.status(500).json({ error: "Internal server error" });
        return;
    }
}

export const getEventsByCategory = async (req: Request, res: Response): Promise<void> => {
    const { category }= req.params;
    // console.log(category);
    try {
        const [results] = await db.query(
            `SELECT
                Events.id AS id,
                Events.name AS name,
                Events.description,
                Events.image,
                Events.promoted,
                Events.date,
                Events.price,
                Events.location,
                Events.organizer,
                Events.category_id,
                Category.name AS category_name
            FROM  Events
            JOIN Category
            ON Events.category_id = Category.id
            WHERE  Category.name = ?`, 
            [category]
        );
        res.json(results);
        return;
    } catch (error) {
        console.error("Error fetching events by category: ", error);
        res.status(500).json({ error: "Internal server error" });
        return;
    }
}

export const getCategories = async (req: Request, res: Response): Promise<void> => {
    try {
        const [result ] = await db.query("SELECT * from Category");
        // console.log("Categories fetched");
        res.json(result);
        return;
    } catch(error) {
        console.error("Error fetching categories: ", error);
        res.status(500).json({ error: "Internal server error" });
        return;
    }
}

