import React from "react";
import { saveAddressAndCheckout } from "../actions/addressAction";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { createClient } from "@/lib/server";
import { redirect } from "next/navigation";
import Image from "next/image";
async function address() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: cartItems = [] } = await supabase
    .from("cart_items")
    .select(
      `
      id,
      quantity,
      price,
      product:products (
        id,
        product_name,
        image,
        quantity
      )
    `
    )
    .eq("user_id", user.id);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);

  const shipping = 106;
  const total = subtotal + shipping;

  return (
    <div>
      <Header />
      {/* Push content down (because header is fixed) */}
      <div className="h-[118px]" />
      {/* Banner */}
      <div className="bg-[#F6F5FF] h-[286px]">
        <div className="max-w-[1280px] mx-auto pt-[100px] pl-[100px]">
          <h1 className="font-bold text-[36px] text-[#101750]">Add Adress</h1>
          <p className="text-[16px]">
            Home . Pages
            <span className="text-[#FB2E86]"> . Add Adress</span>
          </p>
        </div>
      </div>

      <div className=" bg-white py-20">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 px-4">
          {/* LEFT SIDE – FORM */}
          <div className="lg:col-span-2 bg-[#f6f7fb] p-8 rounded shadow">
            <h2 className="text-xl font-semibold mb-6 text-[#1D3178]">
              Contact Information
            </h2>

            <form action={saveAddressAndCheckout} className="space-y-6">
              <input
                type="email"
                placeholder="Email or mobile phone number"
                name="email"
                required
                className="w-full border-b bg-[#f6f7fb] border-gray-300 py-3 mb-6 outline-none"
              />

              <label className="flex items-center text-sm text-gray-500 mb-10">
                <input type="checkbox" className="mr-2 " />
                Keep me up to date on news and exclusive offers
              </label>

              <h2 className="text-xl font-semibold mb-6 text-[#1D3178]">
                Shipping Address
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  name="full_name"
                  placeholder="Full Name"
                  type="text"
                  required
                  className="border-b py-3 bg-[#f6f7fb] outline-none"
                />
                <input
                  name="phone"
                  placeholder="Phone Number"
                  type="tel"
                  className="border-b py-3 bg-[#f6f7fb] outline-none"
                  required
                />
              </div>

              <input
                name="address1"
                placeholder="Address"
                type="text"
                className="w-full border-b bg-[#f6f7fb] py-3 outline-none"
                required
              />

              <input
                name="address2"
                placeholder="Apartment, suite, etc. (optional)"
                type="text"
                className="w-full border-b bg-[#f6f7fb] py-3 outline-none"
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <input
                  name="city"
                  placeholder="City"
                  type="text"
                  className="border-b py-3 bg-[#f6f7fb]  outline-none"
                  required
                />
                <input
                  name="country"
                  placeholder="Country"
                  type="text"
                  className="border-b py-3 bg-[#f6f7fb] outline-none"
                  required
                />
                <input
                  name="postal_code"
                  placeholder="Postal Code"
                  type="text"
                  className="border-b py-3 bg-[#f6f7fb] outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="mt-6 bg-[#FB2E86] text-white px-8 py-3 rounded hover:bg-pink-600 transition"
              >
                Continue Shipping
              </button>
            </form>
          </div>

          {/* RIGHT SIDE – ORDER SUMMARY */}
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-lg font-semibold mb-6 text-[#1D3178]">
              Order Summary
            </h2>

            {/* Product Item */}
            {cartItems.map((Item, index) => (
              <div
                key={index}
                className="flex justify-between items-center border-b py-4"
              >
                <div className="flex items-center  gap-4">
                  <div className="w-14 h-14 bg-gray-200 rounded flex justify-center items-center">
                    <Image
                      width={20}
                      height={20}
                      src={Item.product.image}
                      alt={Item.product.product_name}
                      className="w-auto h-auto object-cover rounded"
                    />
                  </div>

                  <div>
                    <p className="text-sm font-medium">
                      {Item.product.product_name}
                    </p>
                    <p className="text-xs text-gray-500">
                      Quantity: {Item.quantity}
                    </p>
                  </div>
                </div>
                <p className="text-sm font-semibold">${Item.price}</p>
              </div>
            ))}

            {/* Totals */}
            <div className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Subtotals:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between font-semibold text-lg">
                <span>Totals:</span>
                <span>${total}</span>
              </div>

              <p className="text-xs text-green-600">
                ✔ Shipping & taxes calculated at checkout
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default address;
