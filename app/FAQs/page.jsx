"use server";
import React from "react";
import Header from "../components/Header";
import Input from "../components/ui/input";
import BrandsLogo from "../components/BrandsLogo";
import Footer from "../components/Footer";
async function FAQs() {
  return (
    <>
      <Header />
      <div className="h-[118px]"></div>
      {/* Push content down (because header is fixed) */}
      <div className=" w-full bg-[#F6F5FF] h-[286px]">
        <div className="max-w-[1280] mx-auto flex flex-col  items-start pt-[100px] pl-[100px]">
          <div>
            <h1 className="font-bold text-[36px] text-[#101750]">FAQ</h1>
          </div>
          <div className="text-[16px] font-medium text-black">
            <p>
              Home . Pages
              <span className="text-[#FB2E86]">. Faq</span>
            </p>
          </div>
        </div>
      </div>
      <div className="max-w-[1080px] mx-auto">
        <div className="flex justify-between items-center  pt-[134px] ">
          <div className="flex flex-col justify-center items-start w-[499px]">
            <h1 className="font-bold text-[36px] text-[#1D3178] pb-[64px]">
              Generel Information
            </h1>
            <p className="font-bold text-[17px] text-[#1D3178] pb-[15px]">
              Eu dictumst cum at sed euismood condimentum?
            </p>
            <p className="font-normal text-[16px] text-[#A1ABCC] pb-[64px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt
              sed tristique mollis vitae, consequat gravida sagittis.
            </p>
            <p className="font-bold text-[17px] text-[#1D3178] pb-[15px]">
              Magna bibendum est fermentum eros.
            </p>
            <p className="font-normal text-[16px] text-[#A1ABCC] pb-[66px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt
              sed tristique mollis vitae, consequat gravida sagittis.
            </p>
            <p className="font-bold text-[17px] text-[#1D3178] pb-[15px]">
              Odio muskana hak eris conseekin sceleton?
            </p>
            <p className="font-normal text-[16px] text-[#A1ABCC] pb-[66px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt
              sed tristique mollis vitae, consequat gravida sagittis.
            </p>
            <p className="font-bold text-[17px] text-[#1D3178] pb-[15px]">
              Elit id blandit sabara boi velit gua mara?
            </p>
            <p className="font-normal text-[16px] text-[#A1ABCC] pb-[64px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt
              sed tristique mollis vitae, consequat gravida sagittis.
            </p>
          </div>
          <div className="w-[566px] h-[738px] bg-[#F8F8FD] py-[66px] px-[42px]">
            <h2 className="font-bold text-[24px] text-[#1D3178]">
              Ask a Question
            </h2>
            <div className="mt-[120px]">
              <form>
                <Input name={"text"} PH={"Name"} CSS="mb-[11px]" />
                <Input name={"email"} PH={"email"} CSS="mb-[11px]" />
                <Input name={"text"} PH={"Subject"} CSS="mb-[11px]" />
                <textarea
                  placeholder="Type your message..."
                  rows={4}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:outline-none focus:shadow-outline mb-[35px]"
                />
                <button type="submit" className="nav_button">
                  Send Mail
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <BrandsLogo />
      <Footer />
    </>
  );
}

export default FAQs;
