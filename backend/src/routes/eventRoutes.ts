import express from 'express';
import { getAllEvents, getPromotedEvent, getEventsByCategory, getCategories } from '../controller/eventsController';


const router = express.Router();

router.get('/allEvents', getAllEvents);
router.get('/promotedEvents', getPromotedEvent);
router.get('/eventsByCategory/:category', getEventsByCategory)
router.get('/categories', getCategories);

export default router;
