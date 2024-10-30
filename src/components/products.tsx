import React from "react";
import { ProductProps } from "../../type";
import Image from "next/image";
import { HiShoppingCart } from "react-icons/hi";
import { FaHeart } from "react-icons/fa";
import FormattedPrice from "./FormatedPrice";
import { useDispatch } from "react-redux";
import { addToCart, addToFavorite } from "@/store/nextSlice";

interface ProductsProps {
  productData: ProductProps[];
}

const Products = ({ productData }: ProductsProps) => {
  const dispatch = useDispatch();
  return (
    <div className="w-full px-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {productData.map(({ id, title, price, description, category, image }) => (
        <div key={id} className="w-full bg-white text-black p-4 border-gray-300 rounded-lg group overflow-hidden ">
          <div className="w-full h-[320px] relative">
            <Image
              className="w-full h-full object-cover scale-90 hover:scale-100 transition-transform duration-300"
              width={300}
              height={300}
              src={image}
              alt="ProductImage"
            />

            <div className="w-12 h-12 absolute bottom-20 right-0 border-[1px] border-gray-400 bg-white rounded-md flex flex-col translate-x-20 group-hover:translate-x-0 transition-transform duration-300">
              <span
                onClick={() =>
                  dispatch(
                    addToCart({
                      id,
                      title,
                      price,
                      description,
                      category,
                      image,
                      quantity: 1,
                    })
                  )
                }
                className="w-full h-full border-b-[1px] border-b-gray-400 flex items-center justify-center text-xl bg-transparent hover:bg-amazon_yellow cursor-pointer duration-300"
              >
                <HiShoppingCart />
              </span>
              <span
                onClick={() =>
                  dispatch(
                    addToFavorite({
                      id,
                      title,
                      price,
                      description,
                      category,
                      image,
                      quantity: 1,
                    })
                  )
                }
                className="w-full h-full border-b-[1px] border-b-gray-400 flex items-center justify-center text-xl bg-transparent hover:bg-amazon_yellow cursor-pointer duration-300"
              >
                <FaHeart />
              </span>
            </div>
          </div>
          <hr />
          <div className="px-4 py-3 flex flex-col gap-1"></div>
          <p className="text-xs text-green-500 tracking-wide">{category}</p>
          <p className="text-base font-medium text-amber-950">{title}</p>
          <p className="flex items-center">
            <span className="text-sky-700 font-bold">
              <FormattedPrice amount={price * 10} />
            </span>
          </p>
          <p className="text-xs text-gray-500 text-justify">
            {description.substring(0, 200)}
          </p>
          <button
            onClick={() =>
              dispatch(
                addToCart({
                  id,
                  title,
                  price,
                  description,
                  category,
                  image,
                  quantity: 1,
                })
              )
            }
            className="h-10 font-medium w-full bg-amazon_blue text-white rounded-md hover:bg-amazon_yellow hover:text-black duration-300 mt-2"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default Products;
