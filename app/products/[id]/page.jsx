// app/products/[id]/page.jsx
import { notFound } from "next/navigation";
import Header from "../../components/Header";
import Image from "next/image";
import Footer from "../../components/Footer";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { createClient } from "../../../lib/server";
import AddToFav from "../../components/ui/AddToFav";
import AddToCart from "@/app/components/ui/addToCart";
export default async function ProductDetailPage({ params }) {
  // IMPORTANT: params se direct id access karein
  const { id } = await params;

  const supabase = await createClient();
  // Fetch product details from Supabase based on the id
  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();
  if (error || !product) {
    console.error("Error fetching product:", error);
    return notFound();
  }

  return (
    <div>
      <Header />
      <div className="h-[118px]"></div>
      {/* Push content down (because header is fixed) */}
      <div className=" w-full bg-[#F6F5FF] h-[286px]">
        <div className="max-w-[1280] mx-auto flex flex-col  items-start pt-[100px] pl-[100px]">
          <div>
            <h1 className="font-bold text-[36px] text-[#101750]">
              Products Details
            </h1>
          </div>
          <div className="text-[16px] font-medium text-black">
            <p>
              Home . Pages
              <span className="text-[#FB2E86]">. Products Details</span>
            </p>
          </div>
        </div>
      </div>
      {/* body products details */}
      <div className="mt-[121px] mb-[99px]">
        <div className="max-w-[1280px] mx-auto flex justify-center gap-[30px]">
          <div className="w-[500px] h-[500px] bg-[#F5F6F8] flex justify-center items-center rounded-[6px]">
            <Image
              src={product.image}
              alt="image"
              width={400}
              height={400}
              className="w-auto h-auto object-contain"
            />
          </div>
          <div className="flex flex-col justify-center gap-[20px]">
            <h1 className="font-bold text-[28px] text-[#151874]">
              {product.product_name}
            </h1>
            <p className="font-semibold text-[20px] text-[#FB2E86]">
              ${product.off_price ? product.off_price : product.price}
            </p>
            <p className="font-medium text-[16px] text-[#8A8FB9] w-[500px]">
              {product.description}
            </p>
            <div className="flex gap-[20px] items-center">
              <AddToFav productid={product.id} />
              <AddToCart product={product} />
            </div>
            <h3 className="font-lg text-[18px] text-[#151874]">
              Category:{" "}
              <span className="text-[#151874] text-[16px] font-medium">
                {product.category}
              </span>
            </h3>
            <h3 className="font-lg text-[18px] text-[#151874] ">
              Tags:{" "}
              <span className="text-[#151874] text-[16px] font-medium">
                {product.tags}
              </span>
            </h3>
            <div className="flex gap-[10px] items-center">
              <div>
                <h3 className="font-lg text-[18px] text-[#151874]">Share: </h3>
              </div>
              <div className="flex gap-3 text-[#151875]">
                <div className="flex justify-center items-center rounded-full w-6 h-6 bg-[#151875] text-white">
                  <Facebook size={14} />
                </div>
                <div className="flex justify-center items-center rounded-full w-6 h-6 bg-[#FB2E86] text-white">
                  <Instagram size={14} color="white" />
                </div>
                <div className="flex justify-center items-center rounded-full w-6 h-6 bg-[#151875] text-white">
                  <Twitter size={14} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* More product details */}
      <Footer />
    </div>
  );
}
