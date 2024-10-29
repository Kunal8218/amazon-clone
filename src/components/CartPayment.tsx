import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { stateProps, StoreProduct } from "../../type";
import { SiMediafire } from "react-icons/si";
import FormattedPrice from "./FormatedPrice";
import { loadStripe } from "@stripe/stripe-js";
import { useSession } from "next-auth/react";

const CartPayment = () => {
    const { productData, userInfo } = useSelector((state: stateProps) => state.next);
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        let amount = 0;
        productData.map((item: StoreProduct) => {
            amount += item.price * 10 * item.quantity;
        })
        setTotalAmount(amount)
    }, [productData])



    //stripe Payment Gateway
    const stripePromise = loadStripe(
        process.env.NEXT_PUBLIC_STRIPR_PUBLISHABLE_KEY!
    )

    const {data:session}  = useSession();
    const handleCheckout = async() => {
        const stripe = await stripePromise;

        const response = await fetch("/api/checkout", {
            method: "POST",
            headers:{
                "Content-Type" : "application/json",
            },
            body: JSON.stringify({items: productData, email: session?.user?.email}),
        });

        const checkOutSession = await response.json();

        const result:any = await stripe?.redirectToCheckout({
            sessionId: checkOutSession.id,
        });

        if(result.error){
            alert(result?.error.message);
        }
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex gap-2">
                <span className="bg-green-600 rounded-full p-1 h-6 w-6 text-sm
                 text-white flex items-center justify-center mt-1">
                    <SiMediafire />
                </span>
                <p className="text-sm">Your order is eligible for free Delivery. Continue for more details</p>
            </div>
            <p>
                Total Price: {" "}
                <span className="font-bold text-xl">
                    <FormattedPrice amount={totalAmount} />
                </span>
            </p>

            {
                userInfo ? (
                    <div className="flex flex-col items-center">

                        <button onClick={handleCheckout} className="w-full h-10 text-sm font-semibold bg_amazon_yellow text-black rounded-lg hover:bg-amazon_blue hover:text-white duration-300">
                            Proceed to Checkout
                        </button>

                    </div>
                ) : (
                    <div className="flex flex-col items-center">
                        <button className="w-full h-10 text-sm font-semibold bg-amazon_yellow text-white rounded-lg cursor-not-allowed">Proceed to checkout</button>
                        <p className="text-xs mt-1 text-red-500 font-semibold animate-bounce">Please Login to continue</p>
                    </div>
                )
            }

        </div>
    );
}

export default CartPayment;