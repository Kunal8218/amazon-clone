import { NextApiRequest, NextApiResponse } from "next";
import { StoreProduct } from "../../../type";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
    const {items, email} = req.body;
    const modifiedItems = items.map((item: StoreProduct) => ({
        quantity: item.quantity,
        price_data:{
            currency: "inr",
            unit_amount: item.price * 100 * 10,
            product_data:{
                name: item.title,
                description: item.description,
                images: [item.image],
            }
        }
    }));

    const session = await stripe.checkout.session.create({
        payment_method_types: ["card"],
        shopping_address_collection:{
            allowed_countries: ["IN","US","CA","GB","CM"]
        },
        line_items: modifiedItems,
        mode:"payment",
        success_url: `${process.env.NEXTAUTH_URL}/success`,
        cancel_url: `${process.env.NEXTAUTH_URL}/checkout`,
        metadata: {
            email,
            images: JSON.stringify(items.map((item:any) => items.images))
        }
    });
    res.status(200).json({
        id:session.id,
    })
}