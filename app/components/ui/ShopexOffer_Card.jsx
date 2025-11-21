import React from "react";
import Image from "next/image";

async function ShopexOffer_Card({ image, title }) {
  const text =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa purus gravida.";

  return (
    <div className="w-[270px] h-[320px] flex flex-col items-center justify-center text-center bg-white  shadow-lg shadow-gray-200 p-4">
      <Image src={image} alt="image" width={65} height={65} className="pb-5" />
      <h3 className="text-[#151874] text-[22px] font-semibold">{title}</h3>
      <p className="text-[#1A0B5B4D]">{text}</p>
    </div>
  );
}

export default ShopexOffer_Card;
