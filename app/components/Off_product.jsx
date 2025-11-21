import React from "react";
import Image from "next/image";
function Off_product() {
  const Products = [
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
    <div className="max-w-[1280px] mx-auto">
      {/* pana flex */}
      <div className="flex gap-[29px] justify-center items-center mb-[126px]">
        {Products.slice(0, 2).map((p, index) => (
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
  );
}

export default Off_product;
