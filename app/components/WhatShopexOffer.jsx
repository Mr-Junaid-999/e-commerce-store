import React from "react";
import ShopexOffer_Card from "./ui/ShopexOffer_Card";
async function WhatShopexOffer() {
  const Offers = [
    { image: "/free-delivery-1.png", title: "24/7 Support" },
    { image: "/cashback-1.png", title: "24/7 Support" },
    { image: "/premium-quality-1.png", title: "24/7 Support" },
    { image: "/24-hours-support-1.png", title: "24/7 Support" },
  ];
  return (
    <div className="max-w-[1280px] mx-auto mb-[135px]">
      <h1 className="text-3xl text-[#151874] font-bold  my-4 text-center">
        What Shopex Offer
      </h1>
      <div className="flex justify-around items-center text-center gap-[28px] mt-[55px] mb-10">
        {Offers.map((offer, index) => (
          <ShopexOffer_Card
            key={index}
            image={offer.image}
            title={offer.title}
          />
        ))}
      </div>
    </div>
  );
}

export default WhatShopexOffer;
