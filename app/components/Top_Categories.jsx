"use client";
import React from "react";
import TopCategories from "./ui/Top_Categories_Card";
import { useState } from "react";
function Top_Categories() {
  const products = [
    {
      image: "/Featured_1.png",
      name: "Cantilever chair",
      price: "42.00",
    },
    {
      image: "/Featured_1.png",
      name: "Cantilever chair",
      price: "42.00",
    },
    {
      image: "/Featured_1.png",
      name: "Cantilever chair",
      price: "42.00",
    },
    {
      image: "/Featured_1.png",
      name: "Cantilever chair",
      price: "42.00",
    },
    {
      image: "/Featured_1.png",
      name: "Cantilever chair",
      price: "42.00",
    },
    {
      image: "/Featured_1.png",
      name: "Cantilever chair",
      price: "42.00",
    },
    {
      image: "/Featured_1.png",
      name: "Cantilever chair",
      price: "42.00",
    },
    {
      image: "/Featured_1.png",
      name: "Cantilever chair",
      price: "42.00",
    },
    {
      image: "/Featured_1.png",
      name: "Cantilever chair",
      price: "42.00",
    },
    {
      image: "/Featured_1.png",
      name: "Cantilever chair",
      price: "42.00",
    },
    {
      image: "/Featured_1.png",
      name: "Cantilever chair",
      price: "42.00",
    },
    {
      image: "/Featured_1.png",
      name: "Cantilever chair",
      price: "42.00",
    },
    {
      image: "/Featured_1.png",
      name: "Cantilever chair",
      price: "42.00",
    },
    {
      image: "/Featured_1.png",
      name: "Cantilever chair",
      price: "42.00",
    },
    {
      image: "/Featured_1.png",
      name: "Cantilever chair",
      price: "42.00",
    },
    {
      image: "/Featured_1.png",
      name: "Cantilever chair",
      price: "42.00",
    },
  ];

  const itemsPerSlide = 4;
  const totalSlides = Math.ceil(products.length / itemsPerSlide);
  const [currentSlide, setCurrentSlide] = useState(0);
  console.log("totalSlides", products.length);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="max-w-[1280] mx-auto mb-[135px]">
      <div className="flex flex-col justify-center items-center ">
        <h1 className="text-3xl text-[#151874] font-bold  my-[56px] text-center">
          Top Categories
        </h1>
        <div className="relative w-full overflow-hidden   pl-8">
          {/* Slider Track */}
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {/* Divide products into slides of 4 */}
            {Array.from({ length: totalSlides }).map((_, slideIndex) => (
              <div
                key={slideIndex}
                className="min-w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4   "
              >
                {products
                  .slice(
                    slideIndex * itemsPerSlide,
                    slideIndex * itemsPerSlide + itemsPerSlide
                  )
                  .map((p, i) => (
                    <TopCategories
                      key={i}
                      image={p.image}
                      name={p.name}
                      code={p.code}
                      price={p.price}
                    />
                  ))}
              </div>
            ))}
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center mt-6 space-x-1">
            {Array.from({ length: totalSlides }).map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className={`w-[10px] h-[10px] border border-[#F701A8] rounded-full transition-all duration-300 ${
                  i === currentSlide ? "bg-[#FB2E90] w-6" : " "
                }`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Top_Categories;
