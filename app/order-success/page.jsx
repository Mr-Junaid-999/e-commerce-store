import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";
function ordersuccessfully() {
  return (
    <div>
      <Header />
      {/* Push content down (because header is fixed) */}
      <div className="h-[118px]"></div>
      {/* Banner */}
      <div className=" w-full bg-[#F6F5FF] h-[286px]">
        <div className="max-w-[1280] mx-auto flex flex-col  items-start pt-[100px] pl-[100px]">
          <div>
            <h1 className="font-bold text-[36px] text-[#101750]">
              Order Successfull
            </h1>
          </div>
          <div className="text-[16px] font-medium text-black">
            <p>
              Home . Pages
              <span className="text-[#FB2E86]">. Order Successfull</span>
            </p>
          </div>
        </div>
      </div>
      <div className="max-w-[1280px] mx-auto flex flex-col justify-center items-center my-20">
        <h1 className="font-bold text-[28px] text-[#151874] mb-6">
          Thank you for your order!
        </h1>
        <p className="font-medium text-[16px] text-[#8A8FB9] mb-4">
          Your order has been placed successfully. We will send you an email
          confirmation shortly.
        </p>
        <p className="font-medium text-[16px] text-[#8A8FB9]">
          You can track your order status in your account dashboard.
        </p>
        <Link href={"/products"} className="nav_button mt-8">
          Continue Shopping
        </Link>
      </div>

      <Footer />
    </div>
  );
}

export default ordersuccessfully;
