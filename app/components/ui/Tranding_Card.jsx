"use client";

import { ShoppingCart, Heart, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function TrandingCard({ id, image, name, price, oldPrice }) {
  return (
    <div
      className={`
       flex flex-col  
          
          transition-all duration-300
         bg-white   cursor-pointer
        overflow-hidden
        shadow-lg
        shadow-gray-200 
         
      `}
    >
      <Link href={`/product/${id}`}>
        <div className="h-[250] w-[250]">
          <Image
            src={image}
            alt={name}
            width={250}
            height={250}
            className={`  p-10 max-w-[100%] bg-[#F6F7FB] max-h-full object-contain   pointer-events-none  `}
            draggable={false}
          />
        </div>

        {/* Product Info (bottom area) */}
        <div className="flex flex-col justify-between items-center pb-5  bg-white  ">
          <p className="text-lg text-[#151874] truncate">{name}</p>

          <div className="flex items-center gap-3 ">
            {oldPrice != 0 ? (
              <p className="text-[#151874] font-semibold text-lg">
                ${oldPrice}
              </p>
            ) : (
              <p className="text-[#151874] font-semibold text-lg">${price}</p>
            )}
            {oldPrice != 0 ? (
              <p className="text-[#1518754D] line-through  text-sm">${price}</p>
            ) : null}
            {/* <p className="text-[#1518754D]  text-sm">${price}</p> */}
          </div>
        </div>
      </Link>
    </div>
  );
}
