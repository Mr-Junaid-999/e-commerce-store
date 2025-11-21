import React from "react";
import TrandingCard from "./ui/Tranding_Card";

function TrendingProducts() {
  const Products = [
    {
      image: "/Featured_1.png",
      name: "Cantilever chair",
      price: "26.00",
      oldPrice: "40.00",
    },
    {
      image: "/Featured_1.png",
      name: "Cantilever chair",
      price: "26.00",
      oldPrice: "40.00",
    },
    {
      image: "/Featured_1.png",
      name: "Cantilever chair",
      price: "26.00",
      oldPrice: "40.00",
    },
    {
      image: "/Featured_1.png",
      name: "Cantilever chair",
      price: "26.00",
      oldPrice: "40.00",
    },
  ];
  return (
    <div className="max-w-[1280px] mx-auto">
      <div className="flex-col justify-items-center mt-10 mb-20">
        <h1 className="text-3xl text-[#151874] font-bold  my-4 text-center">
          Trending Products
        </h1>
        <div className="flex justify-around items-center text-center gap-[29px] mt-10 mb-10">
          {Products.map((p, index) => (
            <TrandingCard
              key={index}
              image={p.image}
              name={p.name}
              price={p.price}
              oldPrice={p.oldPrice}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TrendingProducts;
