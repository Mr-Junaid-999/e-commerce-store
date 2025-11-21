"use server";
import Image from "next/image";
import { createClient } from "@/lib/server";
import { redirect } from "next/navigation";
import Header from "./components/Header";
import Hero_Section from "./components/Hero_Section";
import Featured_Products from "./components/Featured_Products";
import Leatest_Products from "./components/Leatest_Products";
import WhatShopexOffer from "./components/WhatShopexOffer";
import Unique_Features from "./components/Unique_Features";
import TrandingProducts from "./components/TrendingProducts";
import Off_product from "./components/Off_product";
import Discount_Item from "./components/Discount_Item";
import Top_Categories from "./components/Top_Categories";
import UpdatesBanner from "./components/UpdatesBanner";
import BrandsLogo from "./components/BrandsLogo";
import LeatestBlogs from "./components/Leatest_Blogs";
import Lamp from "@/public/Lamp.png";
import sofaPromotion from "@/public/sofaPromotionalHeader.png";
import Footer from "./components/Footer";
import ShopexOffer_Card from "./components/ui/ShopexOffer_Card";
import TrandingCard from "./components/ui/Tranding_Card";
export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login");
  }
  const Offers = [
    { image: "/free-delivery-1.png", title: "24/7 Support" },
    { image: "/cashback-1.png", title: "24/7 Support" },
    { image: "/premium-quality-1.png", title: "24/7 Support" },
    { image: "/24-hours-support-1.png", title: "24/7 Support" },
  ];
  const Products = [
    {
      image: "/Featured_1.png",
      name: "Cantilever chair",
      price: "26.00",
      oldPrice: "40.00",
    },
    {
      image: "/Featured_1.png",
      name: "Cantilever chair",
      price: "26.00",
      oldPrice: "40.00",
    },
    {
      image: "/Featured_1.png",
      name: "Cantilever chair",
      price: "26.00",
      oldPrice: "40.00",
    },
    {
      image: "/Featured_1.png",
      name: "Cantilever chair",
      price: "26.00",
      oldPrice: "40.00",
    },
  ];
  const Off_Products = [
    {
      image: "/Off1.png",
      name: "Cantilever chair",
      price: "35.00",
      off: "23",
    },
    {
      image: "/Off2.png",
      name: "Cantilever chair",
      price: "35.00",
      off: "23",
    },
    {
      image: "/Featured_1.png",
      name: "Cantilever chair",
      price: "35.00",
      off: "23",
    },
    {
      image: "/Featured_1.png",
      name: "Cantilever chair",
      price: "35.00",
      off: "23",
    },
    {
      image: "/Featured_1.png",
      name: "Cantilever chair",
      price: "35.00",
      off: "23",
    },
    {
      image: "/Featured_1.png",
      name: "Cantilever chair",
      price: "35.00",
      off: "23",
    },
  ];
  return (
    <div>
      <Header />
      <div className="w-full ">
        {/* Hero Section */}
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
                    New Furniture Collection Trends in{" "}
                    {new Date().getFullYear()}
                  </h1>
                  <p className="text-gray-600 text-lg mb-6">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Magna in est adipiscing in phasellus non in justo.
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
        {/* Featured Products */}
        <Featured_Products />
        {/* Leatest Products */}
        <Leatest_Products />
        {/* WhatShopexOffer */}
        <div className="max-w-[1280px] mx-auto mb-[135px]">
          <h1 className="text-3xl text-[#151874] font-bold  my-4 text-center">
            What Shopex Offer
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
        {/* Unique Feature */}
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
        {/* Tranding Products */}
        <div className="max-w-[1280px] mx-auto">
          <div className="flex-col justify-items-center mt-10 mb-20">
            <h1 className="text-3xl text-[#151874] font-bold  my-4 text-center">
              Trending Products
            </h1>
            <div className="flex justify-around items-center text-center gap-[29px] mt-10 mb-10">
              {Products.map((p, index) => (
                <TrandingCard
                  key={index}
                  image={p.image}
                  name={p.name}
                  price={p.price}
                  oldPrice={p.oldPrice}
                />
              ))}
            </div>
          </div>
        </div>
        {/* Off_product */}
        <div className="max-w-[1280px] mx-auto">
          {/* pana flex */}
          <div className="flex gap-[29px] justify-center items-center mb-[126px]">
            {Off_Products.slice(0, 2).map((p, index) => (
              <div
                key={index}
                className={`w-[420px] h-[270px] flex flex-col ${
                  index == 0 ? "bg-[#FFF6FB]" : "bg-[#EEEFFB]"
                } `}
              >
                <div className="flex flex-col gap-0 p-5">
                  <div className="flex flex-col items-start m-0 p-0">
                    <h3 className="font-semibold text-[26px] text-[#151874] ">
                      {p.off}% off in all products
                    </h3>
                    <button
                      className={` text-sm  hover:underline 
                      text-[#FB2E86] underline
                    `}
                    >
                      {index == 0 ? "Shop Now" : "ViewCollection"}
                    </button>
                  </div>
                  <div className="flex justify-end  h-[207px] pb-5">
                    <Image
                      src={p.image}
                      alt="image"
                      width={312}
                      height={193}
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            ))}
            <div className="flex flex-col w-[267px] h-[270px] gap-[20px] justify-center items-center">
              {Products.slice(2, 5).map((p, index) => (
                <div key={index} className="w-[267px] h-[74px] flex">
                  <div className="w-[107px] h-[74px] bg-[#F5F6F8] flex justify-center items-center">
                    <Image
                      src={p.image}
                      alt="image"
                      width={64}
                      height={71}
                      className="object-contain "
                    />
                  </div>
                  <div className="flex flex-col justify-center items-start pl-3">
                    <p className="text-[#151874]">{p.name}</p>
                    <p className="text-[#151874]">{p.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Discount_Item */}
        <Discount_Item />
        {/* Top_Categories */}
        <Top_Categories />
        {/* UpdatesBanner */}
        <UpdatesBanner />
        {/* BrandsLogo */}
        <BrandsLogo />
        {/* Latest Blog */}
        <LeatestBlogs />
      </div>
      <Footer />
    </div>
  );
}
