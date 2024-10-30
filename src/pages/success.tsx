import { useDispatch } from "react-redux";
import React from "react";
import Link from "next/link";
import { resetCart } from "@/store/nextSlice";

const SuccessPage = () => {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col gap-2 items-center justify-center py-20">
      <h1 className="text-2xl font-semibold">
        Thank you for shopping with us!
      </h1>
      <Link href="/" onClick={() => dispatch(resetCart())}>
        <p className="text-lg text-gray-500 hover:underline underline-offset-4 decoration-[1px] hover:text-blue-600 duration-300">
          Continue Shopping
        </p>
      </Link>
    </div>
  );
};

export default SuccessPage;
