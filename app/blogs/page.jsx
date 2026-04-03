import React from "react";
import Header from "../components/Header";
import Input from "../components/ui/input";
import BrandsLogo from "../components/BrandsLogo";
import Footer from "../components/Footer";
function blogs() {
  return (
    <>
      <Header />
      <div className="h-[118px]"></div>
      {/* Push content down (because header is fixed) */}
      <div className=" w-full bg-[#F6F5FF] h-[286px]">
        <div className="max-w-[1280] mx-auto flex flex-col  items-start pt-[100px] pl-[100px]">
          <div>
            <h1 className="font-bold text-[36px] text-[#101750]">Blogs</h1>
          </div>
          <div className="text-[16px] font-medium text-black">
            <p>
              Home . Pages
              <span className="text-[#FB2E86]">. Blogs</span>
            </p>
          </div>
        </div>
      </div>
      <div className="w-full mx-auto">
        <div className="flex justify-center items-center  pt-[134px] ">
          <div className="flex flex-col justify-center items-center w-[499px]">
            <h1 className="font-bold text-center text-[36px] text-[#1D3178] pb-[64px]">
              Latest Blogs
            </h1>
            <p className="font-bold text-center text-[17px] text-[#1D3178] pb-[15px]">
              Eu dictumst cum at sed euismood condimentum?
            </p>
            <p className="font-normal text-center text-[16px] text-[#A1ABCC] pb-[64px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt
              sed tristique mollis vitae, consequat gravida sagittis.
            </p>
            <p className="font-bold text-center text-[17px] text-[#1D3178] pb-[15px]">
              Magna bibendum est fermentum eros.
            </p>
            <p className="font-normal text-center text-[16px] text-[#A1ABCC] pb-[66px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt
              sed tristique mollis vitae, consequat gravida sagittis.
            </p>
            <p className="font-bold text-center text-[17px] text-[#1D3178] pb-[15px]">
              Odio muskana hak eris conseekin sceleton?
            </p>
            <p className="font-normal text-center text-[16px] text-[#A1ABCC] pb-[66px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt
              sed tristique mollis vitae, consequat gravida sagittis.
            </p>
            <p className="font-bold text-center text-[17px] text-[#1D3178] pb-[15px]">
              Elit id blandit sabara boi velit gua mara?
            </p>
            <p className="font-normal text-center text-[16px] text-[#A1ABCC] pb-[64px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt
              sed tristique mollis vitae, consequat gravida sagittis.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default blogs;
