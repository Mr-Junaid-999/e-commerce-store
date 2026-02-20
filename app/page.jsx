"use server";
import Image from "next/image";
import { createClient } from "@/lib/server";
import { redirect } from "next/navigation";
import Header from "./components/Header";
import { PenTool, Calendar } from "lucide-react";
import Link from "next/link";
import Featured_Products from "./components/Featured_Products";
import Leatest_Products from "./components/Leatest_Products";
import Discount_Item from "./components/Discount_Item";
import Top_Categories from "./components/Top_Categories";
import BrandsLogo from "./components/BrandsLogo";
import Lamp from "@/public/Lamp.png";
import sofaPromotion from "@/public/sofaPromotionalHeader.png";
import Footer from "./components/Footer";
import ShopexOffer_Card from "./components/ui/ShopexOffer_Card";
import TrandingCard from "./components/ui/Tranding_Card";
import { addincartoffproduct } from "./actions/addToCart";
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
  const Blogs = [
    {
      image: "/Frame1.png",
      name: "Saber Ali",
      date: "21 August,2020",
      title: "Top essential Trends in 2021",
      describtion:
        "More off this less hello samlande lied much over tightly circa horse taped mightly ",
    },
    {
      image: "/Frame2.png",
      name: "Surfauxion",
      date: "21 August,2020",
      title: "Top essential Trends in 2021",
      describtion:
        "More off this less hello samlande lied much over tightly circa horse taped mightly ",
    },
    {
      image: "/Frame3.png",
      name: "Saber Ali",
      date: "21 August,2020",
      title: "Top essential Trends in 2021",
      describtion:
        "More off this less hello samlande lied much over tightly circa horse taped mightly ",
    },
  ];

  // 1. All order items laayein
  const { data: allOrders = [] } = await supabase
    .from("order_items")
    .select("product_id, quantity");

  // 2. Har product ki TOTAL quantity calculate karein
  const productTotals = {};

  allOrders.forEach((order) => {
    const productId = order.product_id;
    if (productTotals[productId]) {
      productTotals[productId] += order.quantity;
    } else {
      productTotals[productId] = order.quantity;
    }
  });

  // 3. Sort by TOTAL quantity (zyada se kam)
  const sortedProducts = Object.entries(productTotals)
    .sort(([, totalA], [, totalB]) => totalB - totalA)
    .slice(0, 4); // Top 4

  // 4. Un products ki details laayein
  const topProductIds = sortedProducts.map(([id]) => id);

  const { data: productDetails = [] } = await supabase
    .from("products")
    .select("*")
    .in("id", topProductIds);

  // 5. Combine karein
  const finalResult = productDetails.map((product) => ({
    ...product,
    total_quantity: productTotals[product.id],
  }));

  // 6. Phir se sort (optional)
  finalResult.sort((a, b) => b.total_quantity - a.total_quantity);

  const { data: OFF_Products, error } = await supabase
    .from("products")
    .select("*")
    .eq("off", true)
    .eq("category", "Chair")
    .limit(6);

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
                    {/* {new Date().getFullYear()} */}2026
                  </h1>
                  <p className="text-gray-600 text-lg mb-6">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Magna in est adipiscing in phasellus non in justo.
                  </p>
                  <form action={addincartoffproduct.bind(null, 37)}>
                    <button type="submit" className="nav_button">
                      Shop Now
                    </button>
                  </form>
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
                <form action={addincartoffproduct.bind(null, 27)}>
                  <button type="submit" className="nav_button">
                    Add To Cart
                  </button>
                </form>
                <p className="w-[113px] font-semibold text-[14px] text-[#151874] tracking-[2%]">
                  B&B Italian Sofa $54.00
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
              {finalResult.map((p, index) => (
                <TrandingCard
                  key={index}
                  id={p.id}
                  image={p.image}
                  name={p.product_name}
                  price={p.price}
                  oldPrice={p.off_price}
                />
              ))}
            </div>
          </div>
        </div>
        {/* Off_product */}
        <div className="max-w-[1280px] mx-auto">
          {/* pana flex */}
          <div className="flex gap-[29px] justify-center items-center mb-[126px]">
            {OFF_Products.slice(0, 2).map((p, index) => (
              <div
                key={index}
                className={`w-[420px] h-[270px] flex flex-col ${
                  index == 0 ? "bg-[#FFF6FB]" : "bg-[#EEEFFB]"
                } `}
              >
                <div className="flex flex-col gap-0 p-5">
                  <div className="flex flex-col items-start m-0 p-0">
                    <h3 className="font-semibold text-[26px] text-[#151874] ">
                      {Math.round(((p.price - p.off_price) / p.price) * 100)}%
                      off in all products
                    </h3>
                    <form action={addincartoffproduct.bind(null, p.id)}>
                      <button
                        type="submit"
                        className="text-sm  hover:underline 
                      text-[#FB2E86] underline"
                      >
                        {index == 0 ? "Shop Now" : "ViewCollection"}
                      </button>
                    </form>
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
              {OFF_Products.slice(2, 5).map((p, index) => (
                <div key={index} className="w-[267px] h-[74px] flex">
                  <Link href={`/product/${p.id}`} className="flex">
                    <div className="w-[107px] h-[74px] bg-[#F5F6F8] flex justify-center items-center">
                      <Image
                        src={p.image}
                        alt="image"
                        width={64}
                        height={71}
                        className="object-contain "
                      />
                    </div>
                    <div className="flex w-[160px] h-[74px] flex-col justify-center items-start pl-3">
                      <p className="text-[#151874] text-[16px]">
                        {p.product_name}
                      </p>
                      <p className="text-[#151874]">${p.off_price}</p>
                    </div>
                  </Link>
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
        <div
          className="bg-cover bg-center w-full h-[462px]"
          style={{ backgroundImage: "url('/Rectangle.png')" }}
        >
          <div className="max-w-[1080px] mx-auto flex h-[462px]  justify-center items-center ">
            <div className="w-[574px] flex flex-col justify-between        gap-[28px]         items-center content-center text-center">
              <div>
                <h1 className="text-[35px] text-[rgb(21,24,116)] font-bold leading-normal text-center">
                  See Our Latest Updates About Products & Furniture
                </h1>
              </div>
              <div>
                <Link
                  href={"/products"}
                  className="bg-[#FB2E86] text-white hover:bg-[#d2066c] font-semibold text-[17px] px-8 py-3   transition;"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* BrandsLogo */}
        <BrandsLogo />
        {/* Latest Blog */}
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-col justify-items-center mt-10 mb-20">
            <h1 className="text-3xl text-[#151874] font-bold  my-4 text-center">
              Leatest Blogs
            </h1>
            <div className="flex gap-[56px] justify-center items-center mt-[75px]">
              {Blogs.map((b, i) => (
                <div
                  key={i}
                  className="group w-[370px] h-[493px]  shadow-lg shadow-gray-100 flex flex-col rounded-[8px] cursor-pointer"
                >
                  <div className="w-[370px] h-[255px] ">
                    <Image
                      src={b.image}
                      alt="image"
                      width={370}
                      height={255}
                      className="object-contain"
                    />
                  </div>
                  <div className="flex gap-[29px]  justify-start items-center ">
                    <div className="flex  gap-2 justify-start items-center p-3">
                      <PenTool className="w-[11.33px] h-[11.33px] text-[#FB2E86]" />
                      <div className="font-normal text-[14px] text-[#151874]">
                        {b.name}
                      </div>
                    </div>
                    <div className="flex  gap-3 justify-start items-center p-3">
                      <Calendar className="w-[11.33px] h-[11.33px] text-[#FFA454]" />
                      <div className="font-normal text-[14px] text-[#151874]">
                        {b.date}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center items-start gap-[15.5px] p-3">
                    <div className="font-bold text-[18px] text-[#151874] group-hover:text-[#FB2E86]">
                      {b.title}
                    </div>
                    <p className="font-normal text-[#72718F] text-[16px]">
                      {b.describtion}
                    </p>
                    <Link
                      href={"#"}
                      className="font-normal text-[16px] text-[#151874] group-hover:text-[#FB2E86] underline"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
