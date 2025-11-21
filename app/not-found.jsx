"use server";
import Header from "./components/Header";
import Image from "next/image";
import Footer from "./components/Footer";
import BrandsLogo from "./components/BrandsLogo";
const ErrorPage = async () => {
  return (
    <>
      <Header />
      <div className="h-[118px]"></div>
      {/* Push content down (because header is fixed) */}
      <div className=" w-full bg-[#F6F5FF] h-[286px]">
        <div className="max-w-[1280] mx-auto flex flex-col  items-start pt-[100px] pl-[100px]">
          <div>
            <h1 className="font-bold text-[36px] text-[#101750]">
              404 Not Found
            </h1>
          </div>
          <div className="text-[16px] font-medium text-black">
            <p>
              Home . Pages
              <span className="text-[#FB2E86]">. 404 Not Found</span>
            </p>
          </div>
        </div>
      </div>
      <div className="max-w-[1280] mx-auto ">
        <div className="flex flex-col justify-center items-center">
          <div className="mr-[10%]">
            <Image
              src={"/error.png"}
              alt="image"
              width={913}
              height={644.43}
              className="object-contain "
            />
          </div>
          <button className="nav_button">Back To Home</button>
        </div>
        <BrandsLogo />
      </div>
      <Footer />
    </>
  );
};

export default ErrorPage;
