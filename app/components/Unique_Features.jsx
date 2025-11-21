import React from "react";
import Image from "next/image";
function Unique_Features() {
  return (
    <div className="bg-[#F1F0FF] w-full">
      <div className="max-w-[1050px] mx-auto flex justify-between items-center pt-7">
        <Image
          src={"/UniqueFeature.png"}
          alt="image"
          width={558}
          height={550}
        />
        <div className="flex flex-col justify-start items-start">
          <h1 className="text-[#151874] font-bold text-[35px] mb-4">
            Unique Features Of leatest & Trending Poducts
          </h1>
          <div className="flex w-[461px] gap-3 mr-7 p-0 mb-2">
            <div className="w-2 h-2">
              <div className="w-2 h-2 mt-1  rounded-full  bg-[#F52B70]"></div>
            </div>
            <div className="font-medium text-[16px] text-[#ACABC3]">
              All frames constructed with hardwood solids and laminates
            </div>
          </div>
          <div className="flex w-[461px] gap-3 mr-7 mb-2">
            <div className="w-2 h-2">
              <div className="w-2 h-2 mt-1  rounded-full  bg-[#2B2BF5]"></div>
            </div>

            <div className="font-medium text-[16px] text-[#ACABC3]">
              Reinforced with double wood dowels, glue, screw - nails corner
              blocks and machine nails
            </div>
          </div>
          <div className="flex w-[461px] gap-3 mr-7 p-0 mb-2">
            <div className="w-2 h-2">
              <div className="w-2 h-2 mt-1 rounded-full bg-[#2BF5CC]"></div>
            </div>

            <div className="font-medium text-[16px] text-[#ACABC3]">
              Arms, backs and seats are structurally reinforced
            </div>
          </div>
          <div className="flex justify-start items-start gap-3">
            <button className="nav_button">Add To Cart</button>
            <p className="w-[113px] font-semibold text-[14px] text-[#151874] tracking-[2%]">
              B&B Italian Sofa $32.00
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Unique_Features;
