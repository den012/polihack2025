import express from 'express';
import { Request, Response } from 'express';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2025-03-31.basil',
});

export const payment =  async (req: Request, res: Response): Promise<void> => {
    const {name, price } = req.body;


    try {
        const percentageFeeRate = 0.03;
        const percentageFee = Math.round(price * percentageFeeRate * 100);

        const totalPrice = Math.round(price * 100) + percentageFee;

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: name,
                            description: 'The price includes a 3% processing fee',
                        },
                        unit_amount: totalPrice,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL}/success`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel`,
        });

        res.status(200).json({ url: session.url });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export default payment;