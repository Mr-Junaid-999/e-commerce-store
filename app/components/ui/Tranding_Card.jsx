"use client";

import { ShoppingCart, Heart, Search } from "lucide-react";
import Image from "next/image";

export default function TrandingCard({ image, name, price, oldPrice }) {
  return (
    <div
      className={`
       flex flex-col justify-between
        w-[275px] h-[350px]
          transition-all duration-300
         bg-white   cursor-pointer
        overflow-hidden
        shadow-lg
        shadow-gray-200 
         
      `}
    >
      {/* IMAGES (stacked, fade) */}

      {/* Default Image */}
      <Image
        src={image}
        alt={name}
        width={260}
        height={244}
        className={`bg-[#F6F7FB]  object-contain   pointer-events-none m-2 `}
        draggable={false}
      />

      {/* Product Info (bottom area) */}
      <div className="flex flex-col justify-between items-center pb-5  bg-white  ">
        <p className="text-lg text-[#151874] truncate">{name}</p>

        <div className="flex items-center gap-3 ">
          <p className="text-[#151874] font-semibold text-lg">${price}</p>
          {oldPrice && <p className="text-[#1518754D]  text-sm">${oldPrice}</p>}
        </div>
      </div>
    </div>
  );
}
