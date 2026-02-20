"use client";
import { useState, useEffect, useRef } from "react";
import ProductCard from "./ui/Card";
import createClient from "@/lib/client";

export default function ProductCarousel() {
  const [products, setProducts] = useState([]);
  const supabase = createClient();

  const itemsPerSlide = 4;
  const totalSlides = Math.ceil(products.length / itemsPerSlide);
  const [currentSlide, setCurrentSlide] = useState(0);
  const intervalRef = useRef(null);

  // Jab totalSlides change ho tab restart

  // Auto scroll function
  const startAutoScroll = () => {
    // Pehle existing interval clear karein
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Naya interval set karein
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prevSlide) => {
        // Agar last slide hai to first pe chale jaye
        return (prevSlide + 1) % totalSlides;
      });
    }, 5000); // 5 seconds
  };

  // Auto scroll ke liye useEffect
  useEffect(() => {
    // Auto scroll start karein
    startAutoScroll();

    // Cleanup function
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [totalSlides]);

  // Manual slide change pe auto scroll restart
  const goToSlide = (index) => {
    setCurrentSlide(index);
    startAutoScroll(); // Restart auto scroll
  };

  // Products fetch karein
  useEffect(() => {
    async function fetchFeaturedProducts() {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: true })
        .limit(16);

      setProducts(data || []);
    }
    fetchFeaturedProducts();
  }, []);

  // Mouse hover pe auto scroll pause/resume
  const [isPaused, setIsPaused] = useState(false);

  const handleMouseEnter = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setIsPaused(true);
    }
  };

  const handleMouseLeave = () => {
    if (!intervalRef.current) {
      startAutoScroll();
      setIsPaused(false);
    }
  };

  return (
    <div className="max-w-[1280px] mx-auto">
      <div className="flex-col justify-center items-center mt-10">
        <h1 className="text-3xl text-[#1A0B5B] font-bold my-4 text-center">
          Featured Products
        </h1>

        <div
          className="relative w-full overflow-hidden py-10 pl-8"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Slider Track */}
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {Array.from({ length: totalSlides }).map((_, slideIndex) => (
              <div
                key={slideIndex}
                className="min-w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4"
              >
                {products
                  .slice(
                    slideIndex * itemsPerSlide,
                    slideIndex * itemsPerSlide + itemsPerSlide,
                  )
                  .map((p, i) => (
                    <ProductCard
                      key={i}
                      product_id={p.id}
                      image={p.image}
                      name={p.product_name}
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
