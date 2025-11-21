import React from "react";
import Image from "next/image";
import Lamp from "@/public/Lamp.png";
import sofaPromotion from "@/public/sofaPromotionalHeader.png";
async function Hero_Section() {
  return (
    <div
      className="w-full  h-auto pb-[10vh] bg-[#F2F0FF]"
      style={{ paddingTop: "120px" }}
    >
      <div className="max-w-[1280px] mx-auto">
        <div className="flex justify-between px-5">
          <div className="">
            <Image src={Lamp} alt="lamp" className="w-auto h-auto " />
          </div>
          <div className="flex h-auto justify-center items-center w-[800px]">
            <div className=" mt-20">
              <p className="text-sm  text-[#FB2E86]">
                Best Furniture For Your Castle...
              </p>
              <h1 className="text-5xl text-[#000000] font-bold  my-4">
                New Furniture Collection Trends in {new Date().getFullYear()}
              </h1>
              <p className="text-gray-600 text-lg mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna
                in est adipiscing in phasellus non in justo.
              </p>
              <button className="nav_button">Shop Now</button>
            </div>
          </div>
          <div className="pl-4 pr-2 mt-20">
            <Image
              src={sofaPromotion}
              alt="sofaPromotion"
              className="w-auto h-auto "
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero_Section;
