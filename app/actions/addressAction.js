"use server";

import { createClient } from "@/lib/server";
import { redirect } from "next/navigation";

export async function saveAddressAndCheckout(formData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  console.log("Form Data address:", {
    user_id: user.id,
    email: formData.get("email"),
    full_name: formData.get("full_name"),
    phone: formData.get("phone"),
    country: formData.get("country"),
    city: formData.get("city"),
    address1: formData.get("address1"),
    address2: formData.get("address2"),
    postal_code: formData.get("postal_code"),
  });

  // 1️⃣ Save address
  const { data: address } = await supabase
    .from("addresses")
    .insert({
      user_id: user.id,
      email: formData.get("email"),
      full_name: formData.get("full_name"),
      phone: formData.get("phone"),
      country: formData.get("country"),
      city: formData.get("city"),
      address_line1: formData.get("address1"),
      address_line2: formData.get("address2"),
      postal_code: formData.get("postal_code"),
    })
    .select("id")
    .single();

  // 2️⃣ Get cart items
  const { data: cartItems } = await supabase
    .from("cart_items")
    .select("*")
    .eq("user_id", user.id);

  console.log("Cart Items:", cartItems);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const shipping = 106;
  const total = subtotal + shipping;

  console.log("Order Summary:", { subtotal, shipping, total });
  console.log("Proceeding to create order...");
  console.log(
    "order",
    "user.id",
    user.id,
    "address.id",
    address.id,
    "subtotal",
    subtotal,
    "shipping",
    shipping,
    "total",
    total
  );
  // 3️⃣ Create order
  const { data: order, error } = await supabase
    .from("orders")
    .insert({
      user_id: user.id,
      address_id: address.id,
      subtotal: subtotal,
      shipping: shipping,
      total: total,
      status: "pending",
      payment_status: "pending",
      payment_method: "cod",
    })
    .select("id")
    .single();

  console.log("Created Order:", order, "Error:", error);

  // 4️⃣ Insert order items
  const orderItems = cartItems.map((item) => ({
    order_id: order.id,
    product_id: item.product_id,
    quantity: item.quantity,
    price: item.price,
  }));

  await supabase.from("order_items").insert(orderItems);

  // 5️⃣ Clear cart
  await supabase.from("cart_items").delete().eq("user_id", user.id);

  redirect(`/order-success`);
}
