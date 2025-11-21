import React from "react";
import Header from "../components/Header";
import Image from "next/image";
import ShopexOffer_Card from "../components/ui/ShopexOffer_Card";
import TestimonialSlider from "../components/TestimonialSlider";
import Footer from "../components/Footer";
function about() {
  const Offers = [
    { image: "/free-delivery-1.png", title: "24/7 Support" },
    { image: "/cashback-1.png", title: "24/7 Support" },
    { image: "/premium-quality-1.png", title: "24/7 Support" },
    { image: "/24-hours-support-1.png", title: "24/7 Support" },
  ];
  return (
    <>
      <Header />
      <div className="h-[118px]"></div>
      {/* Push content down (because header is fixed) */}
      <div className=" w-full bg-[#F6F5FF] h-[286px]">
        <div className="max-w-[1280] mx-auto flex flex-col  items-start pt-[100px] pl-[100px]">
          <div>
            <h1 className="font-bold text-[36px] text-[#101750]">About Us</h1>
          </div>
          <div className="text-[16px] font-medium text-black">
            <p>
              Home . Pages
              <span className="text-[#FB2E86]">. About Us</span>
            </p>
          </div>
        </div>
      </div>
      <div className="max-w-[1280px] mx-auto mt-[119px] ">
        <div className="flex justify-center items-center gap-[30px]">
          <div className="w-[555px] h-[409px] bg-[#2B3CAB] rounded-[6px]">
            <Image
              src={"/aboutus.png"}
              alt="image"
              width={555}
              height={390}
              className="object-contain rounded-[6px] ml-[15px]"
            />
          </div>
          <div className="h-[409px] w-[550px] flex flex-col justify-center items-start">
            <h1 className="font-bold text-[36px] text-[#151874]">
              Know About Our Ecomerce Business, History
            </h1>
            <p className="font-semibold text-[16px] text-[#8A8FB9] mb-[65px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis
              neque ultrices mattis aliquam, malesuada diam est. Malesuada sem
              tristique amet erat vitae eget dolor lobortis. Accumsan faucibus
              vitae lobortis quis bibendum quam.
            </p>
            <button className="nav_button">Contact us</button>
          </div>
        </div>
        <div className="max-w-[1280px] mx-auto mb-[135px] mt-[141px]">
          <h1 className="text-3xl text-[#151874] font-bold  my-4 text-center">
            Our Features
          </h1>
          <div className="flex justify-around items-center text-center gap-[28px] mt-[55px] mb-10">
            {Offers.map((offer, index) => (
              <ShopexOffer_Card
                key={index}
                image={offer.image}
                title={offer.title}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="w-full bg-[#FBFBFF] h-[503px] flex flex-col justify-center items-center gap-[40px] mb-[305px]">
        <h1 className="text-3xl text-[#151874] font-bold  my-4 text-center">
          Our Client Say!
        </h1>
        <div className="w-[689px]">
          <TestimonialSlider />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default about;
