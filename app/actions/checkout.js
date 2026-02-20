// app/actions/checkout.js
// app/actions/checkout.js
"use server";

import { createClient } from "@/lib/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function checkoutAction(formData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  console.log("Starting checkout for user:", user.id);

  // 0️⃣ Get default address
  const { data: address, errorr } = await supabase
    .from("addresses")
    .select("*")
    .eq("user_id", user.id)
    .single("id");
  console.log("Default address fetched:", address, errorr);

  if (!address) {
    redirect("/add-address");
  }

  // 1️⃣ Get cart items with product stock
  const { data: cartItems, error } = await supabase
    .from("cart_items")
    .select(
      `
      id,
      product_id,
      quantity,
      price,
      product:products (
        id,
        quantity
      )
    `,
    )
    .eq("user_id", user.id);

  if (!cartItems || cartItems.length === 0) {
    throw new Error("Cart is empty");
  }

  // 2️⃣ Stock validation
  for (const item of cartItems) {
    if (item.quantity > item.product.quantity) {
      throw new Error("Stock not available");
    }
  }

  // 3️⃣ Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const shipping = 106;
  const total = subtotal + shipping;

  // );
  // const shipping = 106;
  // const total = subtotal + shipping;

  const paymentMethod = formData.get("payment_method");

  console.log("Checkout details:", {
    user_id: user.id,
    address_id: address.id,
    subtotal: subtotal,
    shipping: shipping,
    total: total,
    status: "pending",
    payment_method: paymentMethod,
    payment_status: paymentMethod === "cod" ? "pending" : "paid",
  });

  // 4️⃣ Create order
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      user_id: user.id,
      address_id: address.id,
      subtotal: subtotal,
      shipping: shipping,
      total: total,
      status: "pending",
      payment_method: paymentMethod,
      payment_status: paymentMethod === "cod" ? "pending" : "paid",
    })
    .select("id")
    .single();

  if (orderError || !order) {
    console.error("Order create failed:", orderError);
    throw new Error("Failed to create order");
  }

  // 5️⃣ Insert order items (🔥 MAIN PART)
  const orderItems = cartItems.map((item) => ({
    order_id: order.id, // ✅ now guaranteed
    product_id: item.product_id,
    quantity: item.quantity,
    price: item.price,
  }));
  await supabase.from("order_items").insert(orderItems);

  // 6️⃣ Subtract stock
  for (const item of cartItems) {
    await supabase
      .from("products")
      .update({
        quantity: item.product.quantity - item.quantity,
      })
      .eq("id", item.product.id);
  }

  // 7️⃣ Clear cart
  await supabase.from("cart_items").delete().eq("user_id", user.id);

  // 8️⃣ Redirect
  redirect("/order-success");
}

export async function clearCart() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  await supabase.from("cart_items").delete().eq("user_id", user.id);
  revalidatePath("/add-to-cart");
}

export async function removeCartItem(cartItemId) {
  const supabase = await createClient();
  await supabase.from("cart_items").delete().eq("id", cartItemId);
  revalidatePath("/add-to-cart");
}
