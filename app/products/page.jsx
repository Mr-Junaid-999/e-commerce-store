// app/products/page.jsx
import Header from "../components/Header";
import Image from "next/image";
import Footer from "../components/Footer";
import Link from "next/link";
import { createClient } from "../../lib/server";
async function products() {
  const supabase = await createClient();

  const { data: Products, error } = await supabase.from("products").select("*");

  return (
    <div>
      <Header />
      <div className="h-[118px]"></div>
      {/* Push content down (because header is fixed) */}
      <div className=" w-full bg-[#F6F5FF] h-[286px]">
        <div className="max-w-[1280] mx-auto flex flex-col  items-start pt-[100px] pl-[100px]">
          <div>
            <h1 className="font-bold text-[36px] text-[#101750]">Products</h1>
          </div>
          <div className="text-[16px] font-medium text-black">
            <p>
              Home . Pages
              <span className="text-[#FB2E86]">. Products</span>
            </p>
          </div>
        </div>
      </div>
      <div className="max-w-[1280px] mx-auto my-[119px] px-4 flex flex-col justify-center items-center">
        <h1 className="text-3xl text-[#151874] font-bold  my-4 text-center">
          Our Products
        </h1>
        <div className="grid grid-cols-4 gap-4 ">
          {Products.map((product, index) => (
            <div
              key={index}
              className="w-[250px] h-[350px]   text-center flex flex-col justify-between"
            >
              <Link href={`/products/${product.id}`}>
                <div className="w-full h-[240px] flex justify-center items-center p-4 bg-[#F5F6F8] hover:bg-[#EBF4F3] rounded-lg">
                  <Image
                    src={product.image}
                    alt={product.product_name}
                    width={250}
                    height={250}
                    className="w-auto h-auto object-contain "
                  />
                </div>
                <div className="mt-4 text-center">
                  <h2 className="text-xl font-semibold text-[#151874] text-center">
                    {product.product_name}
                  </h2>
                  <div className="flex gap-[6px] justify-center">
                    <div className="w-[12px] h-[12px] bg-[#DE9034] rounded-full"></div>
                    <div className="w-[12px] h-[12px] bg-[#EC42A2] rounded-full"></div>
                    <div className="w-[12px] h-[12px] bg-[#8568FF] rounded-full"></div>
                  </div>
                  {product.off_price ? (
                    <div className="flex items-center gap-4 mt-2  justify-center">
                      <span className="text-lg font-bold text-[#FB2E86] ">
                        ${product.off_price}
                      </span>
                      <span className="text-sm text-gray-500 line-through  ">
                        ${product.price}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-4 mt-2   justify-center">
                      <span className="text-lg font-bold text-[#FB2E86]">
                        ${product.price}
                      </span>
                    </div>
                  )}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default products;
