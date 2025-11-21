import React from "react";

function UpdatesBanner() {
  return (
    <div
      className="bg-cover bg-center w-full h-[462px]"
      style={{ backgroundImage: "url('/Rectangle.png')" }}
    >
      <div className="max-w-[1080px] mx-auto flex h-[462px]  justify-center items-center ">
        <div className="w-[574px] flex flex-col justify-between        gap-[28px]         items-center content-center text-center">
          <div>
            <h1 className="text-[35px] text-[#151874] font-bold leading-normal text-center">
              Get Leatest Update By Subscribe 0ur Newslater
            </h1>
          </div>
          <div>
            <button className="nav_button">Shop Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdatesBanner;
