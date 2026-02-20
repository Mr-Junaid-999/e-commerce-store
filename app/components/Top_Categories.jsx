// app/components/Top_Categories.jsx
import React from "react";
import TopCategories from "./ui/Top_Categories_Card";
import { createClient } from "@/lib/server";

async function Top_Categories() {
  const supabase = await createClient();

  const { data: products, error } = await supabase
    .from("products")
    .select("id, product_name, image, price, category, off_price ,quantity");

  if (error) {
    console.log("Error fetching products:", error);
    return null;
  }

  const categoryMap = {};

  products.forEach((product) => {
    const cat = product.category;

    if (!categoryMap[cat]) {
      categoryMap[cat] = {
        category: cat,
        product_count: product.quantity,
        off_price: product.off_price,
        image: product.image,
        product_name: product.product_name,
        price: product.price,
        id: product.id,
      };
    }

    categoryMap[cat].product_count += 1;
  });

  const topCategories = Object.values(categoryMap)
    .sort((a, b) => b.product_count - a.product_count)
    .slice(0, 5);

  console.log("Final Data:", topCategories);

  return (
    <div className="max-w-[1280] mx-auto mb-[135px]">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-3xl text-[#151874] font-bold my-[56px] text-center">
          Top Categories
        </h1>

        <TopCategories products={topCategories} />
      </div>
    </div>
  );
}

export default Top_Categories;
