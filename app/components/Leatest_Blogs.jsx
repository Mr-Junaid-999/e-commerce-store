import React from "react";
import Image from "next/image";
import { PenTool, Calendar } from "lucide-react";
import Link from "next/link";
function Latest_Blogs() {
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
  return (
    <div className="max-w-[1280px] mx-auto">
      <div className="flex flex-col justify-items-center mt-10 mb-20">
        <h1 className="text-3xl text-[#151874] font-bold  my-4 text-center">
          Leatest Blogs
        </h1>
        <div className="flex gap-[56px] justify-center items-center mt-[75px]">
          {Blogs.map((b, i) => {
            return (
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
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Latest_Blogs;
