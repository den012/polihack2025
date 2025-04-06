import express from 'express';
import { payment } from '../controller/stripeController';

const router = express.Router();

router.post('/create-checkout-session', payment);

export default router;