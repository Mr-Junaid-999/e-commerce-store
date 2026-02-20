"use client";
import React from "react";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
function NavMenu({ searchParams }) {
  const Active = searchParams?.active || "home";
  const [box, setBox] = useState(false);
  const ShowBox = () => {
    setBox(true);
  };
  const CloseBox = () => {
    setBox(false);
  };
  return (
    <div>
      {/* Menu */}
      <nav className="flex flex-wrap items-center gap-6 text-gray-700 font-medium">
        <Link
          href={`/`}
          className={`${
            Active === "home" ? "text-pink-500" : "hover:text-pink-500"
          } `}
        >
          Home
        </Link>

        <Link
          onMouseEnter={ShowBox}
          href="/products"
          className={`${
            Active === "products" ? "text-pink-500" : "hover:text-pink-500"
          }`}
        >
          Products
        </Link>

        <Link
          href="blogs"
          className={`${
            Active === "blog" ? "text-pink-500" : "hover:text-pink-500"
          }`}
        >
          Blogs
        </Link>

        <Link
          href={`/faqs`}
          className={`${
            Active === "pages" ? "text-pink-500" : "hover:text-pink-500"
          }`}
        >
          FAQs
        </Link>
        <Link
          href="/about"
          className={`${
            Active === "shop" ? "text-pink-500" : "hover:text-pink-500"
          }`}
        >
          About
        </Link>
        <Link
          href="/contact"
          className={`${
            Active === "contact" ? "text-pink-500" : "hover:text-pink-500"
          }`}
        >
          Contact
        </Link>
      </nav>
      {box && (
        <div
          onMouseLeave={CloseBox}
          className="w-[100vw] h-[450px] bg-[#E7E4F8] absolute left-0 mt-[1%]"
        >
          <div className="max-w-[1280px] mx-auto my-auto px-4">
            {/* Top Section */}
            <div className="grid grid-cols-12  text-center gap-5 mx-16">
              {/* Image */}
              <div className="col-span-6 w-[400px] h-[400px] pt-[5%]  ">
                <Image
                  src={"/sofaPromotionalHeader.png"}
                  alt="image"
                  width={400}
                  height={400}
                  className="object-contain "
                />
              </div>
              {/* Column 1 */}
              <div className="col-span-3 pt-[40%] pl-0">
                <h3 className="text-[#151875] text-lg font-semibold mb-4">
                  Categories
                </h3>
                <ul className="space-y-2 text-[#8A8FB9]">
                  <li>Laptops & Computers</li>
                  <li>Cameras & Photography</li>
                  <li>Smart Phones & Tablets</li>
                  <li>Video Games & Consoles</li>
                  <li>Waterproof Headphones</li>
                </ul>
              </div>

              {/* Column 2 */}
              <div className="col-span-3 pt-[40%] pl-0">
                <h3 className="text-[#151875] text-lg font-semibold mb-4">
                  Customer Care
                </h3>
                <ul className="space-y-2 text-[#8A8FB9]">
                  <li>My Account</li>
                  <li>Discount</li>
                  <li>Returns</li>
                  <li>Orders History</li>
                  <li>Order Tracking</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NavMenu;
