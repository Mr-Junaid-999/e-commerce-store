import React from "react";

import Leatest_Card from "./ui/Leatest_Card";
import { createClient } from "@/lib/server";
async function Leatest_Products() {
  const supabase = await createClient();
  const { data: recentProducts, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false }) // ✅ Naye wale pehle
    .limit(6);

  return (
    <div className="max-w-[1280px] mx-auto">
      <div className="flex-col justify-items-center mt-10 mb-20">
        <h1 className="text-3xl text-[#151874] font-bold  my-4 text-center">
          Leatest Products
        </h1>
        {/*  */}
        <div className="flex flex-wrap items-center justify-center gap-10 mt-10">
          {(recentProducts || []).map((product) => (
            <Leatest_Card
              key={product.id}
              id={product.id}
              image={product.image}
              name={product.product_name}
              price={product.price.toFixed(2)}
              oldPrice={product.off_price.toFixed(2)}
              sale={product.off_price ? true : false}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Leatest_Products;
