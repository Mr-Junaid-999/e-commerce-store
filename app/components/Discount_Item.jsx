"use client";
import React from "react";
import { useState } from "react";
import Image from "next/image";
import { Check } from "lucide-react";
function Discount_Item() {
  const [active, setActive] = useState("Wood Chair");
  return (
    <div className="max-w-[1280] mx-auto">
      <div className="flex flex-col w-[1214px] justify-center items-center ">
        <h1 className="text-3xl text-[#151874] font-bold  my-4 text-center">
          Discount Item
        </h1>
        <div className="flex  justify-center items-center gap-[21px]">
          <div className="flex  justify-center items-center gap-[5px] hover:text-[#FB2E86]">
            <button
              onClick={() => {
                setActive("Wood Chair");
              }}
              className={`hover:text-[#FB2E86] text-sm  hover:underline ${
                active === "Wood Chair"
                  ? "text-[#FB2E86] underline"
                  : "text-[#151874]"
              }`}
            >
              Wood Chair
            </button>
            <div
              className={`w-[5px] h-[5px] rounded-full ${
                active === "Wood Chair" ? "bg-[#FB2E86] underline" : "bg-white"
              }`}
            ></div>
          </div>
          <div className="flex  justify-center items-center gap-[5px] hover:text-[#FB2E86]">
            <button
              onClick={() => {
                setActive("Plastic Chair");
              }}
              className={`hover:text-[#FB2E86] text-sm  hover:underline ${
                active === "Plastic Chair"
                  ? "text-[#FB2E86] underline"
                  : "text-[#151874]"
              }`}
            >
              Plastic Chair
            </button>
            <div
              className={`w-[5px] h-[5px] rounded-full ${
                active === "Plastic Chair"
                  ? "bg-[#FB2E86] underline"
                  : "bg-white"
              }`}
            ></div>
          </div>
          <div className="flex  justify-center items-center gap-[5px] hover:text-[#FB2E86]">
            <button
              onClick={() => {
                setActive("Sofa Colletion");
              }}
              className={`hover:text-[#FB2E86] text-sm  hover:underline ${
                active === "Sofa Colletion"
                  ? "text-[#FB2E86] underline"
                  : "text-[#151874]"
              }`}
            >
              Sofa Colletion
            </button>
            <div
              className={`w-[5px] h-[5px] rounded-full ${
                active === "Sofa Colletion"
                  ? "bg-[#FB2E86] underline"
                  : "bg-white"
              }`}
            ></div>
          </div>
        </div>
        <div className="w-[1214px] h-[575px] flex  justify-center items-center gap-[21px]">
          <div className="flex flex-col justify-center items-start w-[510px]">
            <h1 className="text-[#151874] font-bold text-[35px] pb-[16px]">
              20% Discount Of All Products
            </h1>
            <p className="text-[#FB2E86] font-normal text-[21px] pb-[20px]">
              Eams Sofa Compact
            </p>

            <div className="font-normal text-[17px] text-[#B7BACB] pb-[28px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eu eget
              feugiat habitasse nec, bibendum condimentum.
            </div>

            <div className="flex w-[510px] gap-3 mr-7 mb-[10px]">
              <div className="flex gap-4 w-[230px]">
                <div className="w-2 h-2">
                  <Check className="w-5  text-[#7569B2]" />
                </div>

                <div className="font-medium text-[16px] text-[#ACABC3]">
                  Material expose like metals
                </div>
              </div>
              <div className="flex gap-4 w-[280px]">
                <div className="w-2 h-2">
                  <Check className="w-5  text-[#7569B2]" />
                </div>

                <div className="font-medium text-[16px] text-[#ACABC3]">
                  Clear lines and geomatric figures
                </div>
              </div>
            </div>
            <div className="flex w-[510px] gap-3 mr-7 mb-[37px]">
              <div className="flex gap-4  w-[230px]">
                <div className="w-2 h-2">
                  <Check className="w-5  text-[#7569B2]" />
                </div>

                <div className="font-medium text-[16px] text-[#ACABC3]">
                  Simple neutral colours.
                </div>
              </div>
              <div className="flex gap-4 w-[280px]">
                <div className="w-2 h-2">
                  <Check className="w-5  text-[#7569B2]" />
                </div>

                <div className="font-medium text-[16px] text-[#ACABC3]">
                  Material expose like metals
                </div>
              </div>
            </div>
            <button className="nav_button">Shop Now</button>
          </div>
          <Image src={"/Off_Chair.png"} alt="image" width={558} height={550} />
        </div>
      </div>
    </div>
  );
}

export default Discount_Item;
