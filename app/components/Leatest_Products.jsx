"use client";
import React from "react";
import { useState } from "react";
import Leatest_Card from "./ui/Leatest_Card";
import Feature_1 from "@/public/Featured_1.png";
function Leatest_Products() {
  const [active, setActive] = useState("New Arrival");
  return (
    <div className="max-w-[1280px] mx-auto">
      <div className="flex-col justify-items-center mt-10 mb-20">
        <h1 className="text-3xl text-[#151874] font-bold  my-4 text-center">
          Leatest Products
        </h1>
        <div className="flex gap-10 my-4">
          <button
            onClick={() => {
              setActive("New Arrival");
            }}
            className={`hover:text-[#FB2E86] text-sm  hover:underline ${
              active === "New Arrival"
                ? "text-[#FB2E86] underline"
                : "text-[#151874]"
            }`}
          >
            New Arrival
          </button>
          <button
            onClick={() => {
              setActive("Best Seller");
            }}
            className={`hover:text-[#FB2E86] text-sm hover:underline ${
              active === "Best Seller"
                ? "text-[#FB2E86] underline"
                : "text-[#151874]"
            }`}
          >
            Best Seller
          </button>
          <button
            onClick={() => {
              setActive("Featured");
            }}
            className={`hover:text-[#FB2E86] text-sm hover:underline ${
              active === "Featured"
                ? "text-[#FB2E86] underline"
                : "text-[#151874]"
            }`}
          >
            Featured
          </button>
          <button
            onClick={() => {
              setActive("Special Offer");
            }}
            className={`hover:text-[#FB2E86] text-sm hover:underline ${
              active === "Special Offer"
                ? "text-[#FB2E86] underline"
                : "text-[#151874]"
            }`}
          >
            Special Offer
          </button>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-10 mt-10">
          <Leatest_Card
            image={Feature_1}
            name="Cantilever chair"
            price="42.00"
            oldPrice="62"
          />
          <Leatest_Card
            image={Feature_1}
            name="Cantilever chair"
            price="42.00"
            oldPrice="62"
            sale="true"
          />
          <Leatest_Card
            image={Feature_1}
            name="Cantilever chair"
            price="42.00"
            oldPrice="62"
          />
          <Leatest_Card
            image={Feature_1}
            name="Cantilever chair"
            price="42.00"
            oldPrice="62"
          />
          <Leatest_Card
            image={Feature_1}
            name="Cantilever chair"
            price="42.00"
            oldPrice="62"
            sale="true"
          />
          <Leatest_Card
            image={Feature_1}
            name="Cantilever chair"
            price="42.00"
            oldPrice="62"
          />
        </div>
      </div>
    </div>
  );
}

export default Leatest_Products;
