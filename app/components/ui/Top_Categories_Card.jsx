"use client";
import Image from "next/image";
import { ShoppingCart, Heart, Search } from "lucide-react";

export default function TopCategories({ image, name, price }) {
  return (
    <div className="group w-[269px] h-[361px] m-2 text-[#1E293B] bg-white   transition-all duration-200 text-center overflow-hidden  hover:text-white  ">
      {/* Product Image Section */}
      <div className=" hover:bg-[#892be2b1] w-[269px] h-[269px]  rounded-full flex justify-center items-center ">
        <div className="relative bg-[#F8FAFC] w-[269px] h-[269px]  rounded-full flex justify-center items-center hover:mb-4 ">
          <Image
            src={image}
            alt={name}
            width={150}
            height={150}
            className="object-contain transition-transform duration-300 group-hover:scale-105"
          />

          {/* View Details Button */}
          <button className="absolute top-[219px] left-[135px] -translate-x-1/2 bg-[#00C853] text-white text-sm px-2 py-1  opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            View Details
          </button>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="p-3">
        <h3 className="text-[#151874]  text-[15px] font-semibold mb-1">
          {name}
        </h3>
        <p className="text-[#151874] font-semibold text-[14px]">${price}</p>
      </div>
    </div>
  );
}
