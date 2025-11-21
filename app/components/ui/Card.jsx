"use client";
import Image from "next/image";
import { ShoppingCart, Heart, Search } from "lucide-react";

export default function ProductCard({ image, name, code, price }) {
  return (
    <div className="group w-[270px] h-[361px] m-2 text-[#1E293B] bg-white shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 text-center overflow-hidden hover:bg-[#2F1AC4] hover:text-white  ">
      {/* Product Image Section */}
      <div className="relative bg-[#F8FAFC] h-[236px] flex justify-center items-center">
        <Image
          src={image}
          alt={name}
          width={150}
          height={150}
          className="object-contain transition-transform duration-300 group-hover:scale-105"
        />

        {/* Hover Overlay Icons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="p-2 bg-white rounded-full shadow hover:bg-[#2F1AC4] hover:text-white transition-colors">
            <ShoppingCart size={16} />
          </button>
          <button className="p-2 bg-white rounded-full shadow hover:bg-[#2F1AC4] hover:text-white transition-colors">
            <Heart size={16} />
          </button>
          <button className="p-2 bg-white rounded-full shadow hover:bg-[#2F1AC4] hover:text-white transition-colors">
            <Search size={16} />
          </button>
        </div>

        {/* View Details Button */}
        <button className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-[#00C853] text-white text-sm px-4 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          View Details
        </button>
      </div>

      {/* Product Details Section */}
      <div className="p-3">
        <h3 className="text-[#FB2E86]  text-[15px] font-semibold mb-1">
          {name}
        </h3>
        <div className="flex justify-center items-center gap-1 mb-1">
          <div className="w-[15px] h-[5px] bg-[#05E6B7]"></div>
          <div className="w-[15px] h-[5px] bg-[#F701A8]"></div>
          <div className="w-[15px] h-[5px] bg-[#00009D]"></div>
        </div>
        <p className=" text-[13px] mb-1">
          Code - <span className="text-[#3B82F6]">{code}</span>
        </p>
        <p className=" font-semibold text-[14px]">${price}</p>
      </div>
    </div>
  );
}
