import React from "react";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#F6F5FB] pt-16 ">
      <div className="max-w-[1280px] mx-auto px-4   ">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 lg:pl-8">
          {/* Column 1 */}
          <div>
            <h1 className="text-3xl text-[#151875] font-bold mb-4">Hekto</h1>
            <div className="flex">
              <input
                type="text"
                placeholder="Enter Email Address"
                className="border border-gray-300 px-4 py-2 rounded-l-md w-[180px] text-sm"
              />
              <button className="bg-[#FB2E86] px-4 py-2 text-white rounded-r-md text-sm">
                Sign Up
              </button>
            </div>

            <p className="mt-4 text-[#8A8FB9] text-sm ">Contact Info</p>
            <p className="text-[#8A8FB9] text-sm">
              17 Princess Road, London, Greater London NW1 8JR, UK
            </p>
          </div>

          {/* Column 2 */}
          <div>
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

          {/* Column 3 */}
          <div>
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

          {/* Column 4 */}
          <div>
            <h3 className="text-[#151875] text-lg font-semibold mb-4">Pages</h3>
            <ul className="space-y-2 text-[#8A8FB9]">
              <li>Blog</li>
              <li>Browse the Shop</li>
              <li>Category</li>
              <li>Pre-Built Pages</li>
              <li>Visual Composer Elements</li>
              <li>WooCommerce Pages</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#E7E4F8] mt-10 py-4">
        <div className="max-w-[1280px] mx-auto px-4 flex justify-around items-center">
          <p className="text-[#8A8FB9] text-sm">
            © Webecy - All Rights Reserved
          </p>

          <div className="flex gap-4 text-[#151875]">
            <div className="flex justify-center items-center rounded-full w-7 h-7 bg-[#151875] text-white">
              <Facebook size={18} />
            </div>
            <div className="flex justify-center items-center rounded-full w-7 h-7 bg-[#151875] text-white">
              <Instagram size={18} />
            </div>
            <div className="flex justify-center items-center rounded-full w-7 h-7 bg-[#151875] text-white">
              <Twitter size={18} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
