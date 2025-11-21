import React from "react";
import Image from "next/image";
function BrandsLogo() {
  return (
    <div className="my-[96px] flex justify-center items-center">
      <Image src={"/BrandsLogo.png"} alt="image" width={904} height={93} />
    </div>
  );
}

export default BrandsLogo;
