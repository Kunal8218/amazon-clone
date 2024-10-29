import { useDispatch } from "react-redux";
import React from "react";
import Link from "next/link";
import { resetCart } from "@/store/nextSlice";



const SuccessPage = () => {
    const dispatch = useDispatch();
    return(
        <div className="flex flex-cool gap-2 items-center justify-center py-20">

            <h1 className="text-2xl text-hover8g font-semibold">
                Thank you for shopping in Amazon
            </h1>
            <Link className="text-lg text-gray-500 hover:underline underline-offset-4 decoration-[1px] hover:text-blue-600 duration-300" href={"/"} onClick={()=> dispatch(resetCart())}>
            <p>Continue Shopping</p>
            </Link>
        </div>
    )
}
