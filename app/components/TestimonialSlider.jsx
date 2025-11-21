"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

/**
 * Testimonial slider component
 * Uses the uploaded image at: /mnt/data/8c8478c1-f37c-4665-8f7c-3410ab90caf2.png
 */
export default function TestimonialSlider() {
  const slides = [
    {
      avatars: ["/client1.png"],
      name: "Selina Gomez",
      role: "CEO At Medway Digital",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non duis ultrices quam vel dui sollicitudin aliquet id arcu. Nam vitae a enim nunc, sed sapien egestas ac nam.",
    },
    {
      avatars: ["/client2.png"],
      name: "John Doe",
      role: "Product Manager",
      text: "Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui.",
    },
    {
      avatars: ["/client3.png"],
      name: "Jane Smith",
      role: "Creative Director",
      text: "Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Pellentesque in ipsum id orci porta dapibus.",
    },
  ];

  return (
    <div className="max-w-[760px] mx-auto py-8">
      <Swiper
        modules={[Pagination, Autoplay]}
        slidesPerView={1}
        spaceBetween={30}
        pagination={{
          clickable: true,
          bulletClass:
            "testimonial-bullet inline-block w-8 h-1 rounded-full opacity-40 mr-2",
          bulletActiveClass: "testimonial-bullet-active",
        }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        className="py-6"
      >
        {slides.map((s, idx) => (
          <SwiperSlide key={idx}>
            <div className="flex flex-col items-center text-center px-6">
              {/* avatars row */}
              <div className="flex -space-x-3 mb-4">
                {s.avatars.map((av, i) => (
                  <img
                    key={i}
                    src={av}
                    alt={`avatar-${i}`}
                    className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
                    style={{ objectFit: "cover" }}
                  />
                ))}
              </div>

              {/* name + role */}
              <h3 className="text-xl font-semibold text-[#101750]">{s.name}</h3>
              <p className="text-sm text-[#6B6B9C] mb-4">{s.role}</p>

              {/* description */}
              <p className="text-[#6B6B9C] max-w-[640px] leading-relaxed">
                {s.text}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* small custom CSS to style pagination bullets (global to avoid styled-jsx scoping) */}
      <style jsx global>{`
        .testimonial-bullet {
          background: #ffdbe9;
          transition: opacity 200ms, transform 200ms;
        }

        .testimonial-bullet-active {
          background: #ff2e86;
          opacity: 1;
          transform: scale(1.15);
        }

        /* ⭐ Put pagination BELOW the description */
        .swiper-pagination {
          position: relative !important;
          display: flex;
          justify-content: center;
          margin-top: 20px !important;
        }
      `}</style>
    </div>
  );
}
