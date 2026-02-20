// app/components/ui/Top_Categories_Card.jsx
"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
export default function TopCategories({ products }) {
  console.log("Topcategory", products);
  const itemsPerSlide = 4;
  const totalSlides = Math.ceil(products.length / itemsPerSlide);
  const [currentSlide, setCurrentSlide] = useState(0);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };
  return (
    <>
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
                  slideIndex * itemsPerSlide + itemsPerSlide,
                )
                .map((p, i) => (
                  <div
                    key={i}
                    className="group w-[269px] h-[361px] m-2 text-[#1E293B] bg-white   transition-all duration-200 text-center overflow-hidden  hover:text-white  "
                  >
                    {/* Product Image Section */}
                    <div className=" hover:bg-[#892be2b1] w-[269px] h-[269px]  rounded-full flex justify-center items-center ">
                      <div className="relative bg-[#F8FAFC] w-[269px] h-[269px]  rounded-full flex justify-center items-center hover:mb-4 ">
                        <Image
                          src={p.image}
                          alt={p.product_name}
                          width={150}
                          height={150}
                          className="object-contain transition-transform duration-300 group-hover:scale-105"
                        />

                        {/* View Details Button */}
                        <Link
                          href={`/products/${p.id}`}
                          className="absolute top-[219px] left-[135px] -translate-x-1/2 bg-[#00C853] text-white text-sm px-2 py-1  opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>

                    {/* Product Details Section */}
                    <div className="p-3">
                      <h3 className="text-[#151874]  text-[15px] font-semibold mb-1">
                        {p.product_name}
                      </h3>
                      <p className="text-[#151874] font-semibold text-[14px]">
                        ${p.off_price ? p.off_price : p.price}
                      </p>
                    </div>
                  </div>
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
    </>
  );
}
