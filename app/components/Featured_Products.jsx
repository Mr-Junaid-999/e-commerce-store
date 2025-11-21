// export default Featured_Products;
"use client";
import { useState } from "react";
import ProductCard from "./ui/Card";
export default function ProductCarousel() {
  const products = [
    {
      image: "/Featured_1.png",
      name: "Cantilever chair",
      code: "Y523201",
      price: "42.00",
    },
    {
      image: "/Featured_1.png",
      name: "Cantilever chair",
      code: "Y523202",
      price: "42.00",
    },
    {
      image: "/Featured_1.png",
      name: "Cantilever chair",
      code: "Y523203",
      price: "42.00",
    },
    {
      image: "/Featured_1.png",
      name: "Cantilever chair",
      code: "Y523204",
      price: "42.00",
    },
    {
      image: "/Featured_1.png",
      name: "Cantilever chair",
      code: "Y523205",
      price: "42.00",
    },
    {
      image: "/Featured_1.png",
      name: "Cantilever chair",
      code: "Y523206",
      price: "42.00",
    },
    {
      image: "/Featured_1.png",
      name: "Cantilever chair",
      code: "Y523207",
      price: "42.00",
    },
    {
      image: "/Featured_1.png",
      name: "Cantilever chair",
      code: "Y523208",
      price: "42.00",
    },
    {
      image: "/Featured_1.png",
      name: "Cantilever chair",
      code: "Y523205",
      price: "42.00",
    },
    {
      image: "/Featured_1.png",
      name: "Cantilever chair",
      code: "Y523206",
      price: "42.00",
    },
    {
      image: "/Featured_1.png",
      name: "Cantilever chair",
      code: "Y523207",
      price: "42.00",
    },
    {
      image: "/Featured_1.png",
      name: "Cantilever chair",
      code: "Y523208",
      price: "42.00",
    },
    {
      image: "/Featured_1.png",
      name: "Cantilever chair",
      code: "Y523205",
      price: "42.00",
    },
    {
      image: "/Featured_1.png",
      name: "Cantilever chair",
      code: "Y523206",
      price: "42.00",
    },
    {
      image: "/Featured_1.png",
      name: "Cantilever chair",
      code: "Y523207",
      price: "42.00",
    },
    {
      image: "/Featured_1.png",
      name: "Cantilever chair",
      code: "Y523208",
      price: "42.00",
    },
  ];

  const itemsPerSlide = 4;
  const totalSlides = Math.ceil(products.length / itemsPerSlide);
  const [currentSlide, setCurrentSlide] = useState(0);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="max-w-[1280px] mx-auto">
      <div className="flex-col justify-center items-center mt-10">
        <h1 className="text-3xl text-[#1A0B5B] font-bold  my-4 text-center">
          Featured Products
        </h1>
        <div className="relative w-full overflow-hidden py-10 pl-8">
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
                    <ProductCard
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
                className={`w-4 h-[3px] rounded-full transition-all duration-300 ${
                  i === currentSlide
                    ? "bg-[#FB2E90] w-6"
                    : "bg-[#F701A8] opacity-60"
                }`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
