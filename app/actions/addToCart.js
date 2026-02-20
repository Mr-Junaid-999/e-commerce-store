"use server";

import { createClient } from "@/lib/server";
import { redirect } from "next/navigation";

export async function addToCartAction(formData) {
  const productId = Number(formData.get("product_id"));
  const price = Number(formData.get("price"));
  console.log("addToCartAction called with:", { productId, price });

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { error } = await supabase.from("cart_items").upsert({
    user_id: user.id,
    product_id: productId,
    quantity: 1,
    price: price,
  });

  if (error) {
    console.error("Add to cart error:", error);
    redirect(`/products/${productId}`);
  }

  // ✅ SUCCESS REDIRECT
  redirect("/add-to-cart");
}
export async function addincartoffproduct(productID) {
  "use server";

  const supabase = await createClient();
  console.log("addincartoffproduct called with:", productID);

  const { data: product, error } = await supabase
    .from("products")
    .select("id, price,off_price")
    .eq("id", productID)
    .single(); // ✅ IMPORTANT

  if (error || !product) {
    console.error("Error fetching product:", error);
    redirect("/");
  }

  console.log("Fetched product:", product);

  const productId = Number(product.id);
  const price = Number(product.off_price ? product.off_price : product.price);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { error: cartError } = await supabase.from("cart_items").upsert({
    user_id: user.id,
    product_id: productId,
    quantity: 1,
    price: price,
  });

  if (cartError) {
    console.error("Add to cart error:", cartError);
    redirect(`/products/${productId}`);
  }

  redirect("/add-to-cart");
}
