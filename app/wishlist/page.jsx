import Header from "../components/Header";
import Footer from "../components/Footer";
import { createClient } from "@/lib/server";
import Link from "next/link";
import Image from "next/image";

async function Wishlist() {
  const supabase = await createClient();

  const { data: favorites, error } = await supabase.from("favorites").select(`
      id,
      products (
        id,
        product_name,
        image,
        price,
        off_price
      )
    `);

  if (error) {
    console.log(error);
    return <p>Error loading wishlist</p>;
  }

  return (
    <div>
      <Header />
      <div className="h-[118px]" />

      <div className="w-full bg-[#F6F5FF] h-[286px]">
        <div className="max-w-[1280px] mx-auto pt-[100px] pl-[100px]">
          <h1 className="font-bold text-[36px] text-[#101750]">Wishlist</h1>
          <p className="text-[16px] font-medium text-black">
            Home . Pages <span className="text-[#FB2E86]">. Wishlist</span>
          </p>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto my-[119px] px-4">
        <h1 className="text-3xl text-[#151874] font-bold my-6 text-center">
          Our Wishlist
        </h1>

        <div className="grid grid-cols-4 gap-6">
          {favorites.map((fav) => {
            const product = fav.products;
            if (!product) return null;
            return (
              <div
                key={fav.id}
                className="w-[250px] h-[350px] flex flex-col justify-between text-center"
              >
                <Link href={`/products/${product.id}`}>
                  <div className="w-full h-[240px] flex justify-center items-center p-4 bg-[#F5F6F8] hover:bg-[#EBF4F3] rounded-lg">
                    <Image
                      src={product.image}
                      alt={product.product_name}
                      width={250}
                      height={250}
                      className="w-auto h-auto object-contain"
                    />
                  </div>

                  <h2 className="text-xl font-semibold text-[#151874] mt-4">
                    {product.product_name}
                  </h2>

                  {product.off_price ? (
                    <div className="flex justify-center gap-3 mt-2">
                      <span className="text-lg font-bold text-[#FB2E86]">
                        ${product.off_price}
                      </span>
                      <span className="text-sm line-through text-gray-500">
                        ${product.price}
                      </span>
                    </div>
                  ) : (
                    <span className="text-lg font-bold text-[#FB2E86] mt-2 block">
                      ${product.price}
                    </span>
                  )}
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Wishlist;
