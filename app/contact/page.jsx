import React from "react";
import Header from "../components/Header";
import Input from "../components/ui/input";
import Image from "next/image";
import Footer from "../components/Footer";

function Contact() {
  return (
    <>
      <Header />
      <div className="h-[118px]"></div>
      {/* Push content down (because header is fixed) */}
      <div className=" w-full bg-[#F6F5FF] h-[286px]">
        <div className="max-w-[1280] mx-auto flex flex-col  items-start pt-[100px] pl-[100px]">
          <div>
            <h1 className="font-bold text-[36px] text-[#101750]">Contact Us</h1>
          </div>
          <div className="text-[16px] font-medium text-black">
            <p>
              Home . Pages
              <span className="text-[#FB2E86]">. Contact us</span>
            </p>
          </div>
        </div>
      </div>
      <div className="max-w-[1280px] mx-auto">
        <div className="flex  items-center  py-[120px] px-[23px]">
          <div className="w-[534px] flex flex-col justify-start items-start">
            <div className="mb-[176px]">
              <h1 className="font-bold text-[36px] text-[#151874]">
                Information About us
              </h1>
              <p className="font-semibold text-[16px] text-[#8A8FB9] pb-[60px]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis
                neque ultrices mattis aliquam, malesuada diam est. Malesuada sem
                tristique amet erat vitae eget dolor lobortis. Accumsan faucibus
                vitae lobortis quis bibendum quam.
              </p>
              <div className="flex gap-[14px]">
                <div className="w-[25px] h-[25px] bg-[#5625DF] rounded-full"></div>
                <div className="w-[25px] h-[25px] bg-[#FF27B7] rounded-full"></div>
                <div className="w-[25px] h-[25px] bg-[#37DAF3] rounded-full"></div>
              </div>
            </div>
            <div className="h-[600px]">
              <h1 className="font-bold text-[36px] text-[#151874]">
                Get In Touch
              </h1>
              <p className="font-semibold text-[16px] text-[#8A8FB9] pb-[60px]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis
                neque ultrices tristique amet erat vitae eget dolor los vitae
                lobortis quis bibendum quam.
              </p>
              <div className="flex w-full gap-2">
                <Input name={"text"} PH="Your Name*" />
                <Input name={"email"} PH="Your Email" />
              </div>
              <Input name={"text"} PH="Subject*" />
              <textarea
                placeholder="Type your message..."
                rows={4}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:outline-none focus:shadow-outline mb-[35px]"
              />
              <button type="submit" className="nav_button">
                Send Mail
              </button>
            </div>
          </div>
          <div className="w-[723px] flex flex-col justify-start items-center">
            <div className="mb-[176px] mt-0 pt-0 pb-12">
              <h1 className="font-bold text-[36px] text-[#151874] pb-[24px]">
                Contact Way
              </h1>
              <div className="flex gap-[37px] justify-center items-start pb-[49px]">
                <div className="flex gap-[15px] justify-center items-center">
                  <div className="w-[45px] h-[45px] bg-[#5625DF] rounded-full"></div>
                  <div className="flex flex-col justify-center items-start">
                    <p className="font-semibold text-[16px] text-[#8A8FB9]">
                      Tel: 877-67-88-99
                    </p>
                    <p className="font-semibold text-[16px] text-[#8A8FB9]">
                      E-Mail: shop@store.com
                    </p>
                  </div>
                </div>
                <div className="flex gap-[15px] justify-center items-center">
                  <div className="w-[45px] h-[45px] bg-[#FB2E86] rounded-full"></div>
                  <div className="flex flex-col justify-center items-start">
                    <p className="font-semibold text-[16px] text-[#8A8FB9]">
                      Support Forum
                    </p>
                    <p className="font-semibold text-[16px] text-[#8A8FB9]">
                      For over 24hr
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex gap-[37px] justify-center items-start">
                <div className="flex gap-[15px] justify-center items-center">
                  <div className="w-[45px] h-[45px] bg-[#FFB265] rounded-full"></div>
                  <div className="flex flex-col justify-center items-start">
                    <p className="font-semibold text-[16px] text-[#8A8FB9]">
                      Tel: 877-67-88-99
                    </p>
                    <p className="font-semibold text-[16px] text-[#8A8FB9]">
                      E-Mail: shop@store.com
                    </p>
                  </div>
                </div>
                <div className="flex gap-[15px] justify-center items-center">
                  <div className="w-[45px] h-[45px] bg-[#1BE982] rounded-full"></div>
                  <div className="flex flex-col justify-center items-start">
                    <p className="font-semibold text-[16px] text-[#8A8FB9]">
                      Support Forum
                    </p>
                    <p className="font-semibold text-[16px] text-[#8A8FB9]">
                      For over 24hr
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Image
                src={"/contact.png"}
                alt="image"
                width={600}
                height={600}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Contact;
