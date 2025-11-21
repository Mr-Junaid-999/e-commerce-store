"use client";

import { useState } from "react";
import { ShoppingCart, Heart, Search } from "lucide-react";
import Image from "next/image";

/**
 * ProductCard
 * Props:
 *  - image: string (default image URL)
 *  - hoverImage: string (image to show on hover)
 *  - name: string
 *  - price: string or number
 *  - oldPrice: string or number (optional)
 *  - sale: boolean (optional)
 *  - positioned: boolean (if true will apply the exact absolute positioning you provided)
 */
export default function ProductCard({
  image,
  name,
  price,
  oldPrice,
  sale = false,
}) {
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      className={`
       flex flex-col justify-between  
        w-[360px] h-[306px]
          transition-all duration-300
        bg-[#F6F7FB] hover:bg-white   cursor-pointer
        overflow-hidden
         
      `}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      aria-label={`Product card for ${name}`}
    >
      {/* Optional Sale Tag (commented out by default) */}
      {sale ? (
        <div className=" bg-blue-600 text-white w-[51px] text-xs px-3 py-1  select-none">
          Sale
        </div>
      ) : (
        <span className="  text-white text-xs px-3 py-1 rounded-md select-none"></span>
      )}

      {/* IMAGES (stacked, fade) */}
      <div className=" w-full h-[65%] flex items-center justify-around">
        {/* Left-side hover icons (appear on hover) */}
        <div
          className={`  flex flex-col gap-3 transition-all duration-300 z-5
                    ${
                      isHover
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-4 pointer-events-none"
                    }`}
        >
          <IconWrapper>
            <ShoppingCart size={16} />
          </IconWrapper>

          <IconWrapper>
            <Heart size={16} />
          </IconWrapper>

          <IconWrapper>
            <Search size={16} />
          </IconWrapper>
        </div>
        {/* Default Image */}
        <Image
          src={image}
          alt={name}
          className={`mr-20 max-w-[70%] max-h-full object-contain   pointer-events-none  `}
          draggable={false}
        />
      </div>

      {/* Product Info (bottom area) */}
      <div className="flex justify-between items-center w-[360px]   bg-white  ">
        <p className="text-lg text-[#3F509E] truncate">{name}</p>

        <div className="flex items-center gap-3 mt-2">
          <p className="text-[#3F509E] font-semibold text-lg">${price}</p>
          {oldPrice && (
            <p className="text-red-500 line-through text-sm">${oldPrice}</p>
          )}
        </div>
      </div>
    </div>
  );
}

/* Small icon circle used in the left vertical icon stack */
function IconWrapper({ children }) {
  return (
    <div className="w-9 h-9 bg-white shadow-md rounded-full flex items-center justify-center text-[#3F509E] hover:bg-gray-200  transition">
      {children}
    </div>
  );
}
