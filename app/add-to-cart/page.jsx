// app/add-to-cart/page.jsx
import Header from "../components/Header";
import Footer from "../components/Footer";
import Image from "next/image";
import Link from "next/link";
import {
  Trash2,
  Plus,
  Minus,
  Truck,
  CreditCard,
  ArrowLeft,
} from "lucide-react";

import { createClient } from "@/lib/server";
import { revalidatePath } from "next/cache";
import { removeCartItem } from "../actions/checkout";
import { redirect } from "next/navigation";
import { clearCart } from "../actions/checkout";
import { checkoutAction } from "../actions/checkout";

const CartPage = async () => {
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
        price,
        off_price,
        image,
        quantity
      )
    `,
    )
    .eq("user_id", user.id);

  console.log("Cart Items:", cartItems);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);

  const shipping = 106;
  const total = subtotal + shipping;

  async function updateCartQuantity(productid, cartItemId, newQuantity) {
    "use server";
    console.log("Updating cart item:", { productid });
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    let { data: productPrice, error } = await supabase
      .from("products")
      .select("price, off_price")
      .eq("id", productid)
      .single();

    console.log("Fetched product price:", productPrice, error);

    productPrice = Number(
      productPrice.off_price ? productPrice.off_price : productPrice.price,
    );

    await supabase
      .from("cart_items")
      .update({
        quantity: newQuantity,
        price: newQuantity * productPrice,
      })
      .eq("id", cartItemId)
      .eq("user_id", user.id);
    revalidatePath("/add-to-cart");
  }

  return (
    <div>
      <Header />
      <div className="h-[118px]" />

      {/* Banner */}
      <div className="bg-[#F6F5FF] h-[286px]">
        <div className="max-w-[1280px] mx-auto pt-[100px] pl-[100px]">
          <h1 className="font-bold text-[36px] text-[#101750]">Add To Cart</h1>
          <p className="text-[16px]">
            Home . Pages
            <span className="text-[#FB2E86]"> . Add To Cart</span>
          </p>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto my-[100px] px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* LEFT */}
          <div className="lg:w-2/3">
            <div className="hidden md:grid grid-cols-12 bg-[#FB2E86] text-white p-4 rounded-t-lg">
              <div className="col-span-5">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-center">Total</div>
              <div className="col-span-1"></div>
            </div>

            <div className="bg-white border rounded-lg">
              {cartItems.length === 0 && (
                <p className="p-6 text-center text-gray-500">Cart is empty</p>
              )}

              {cartItems.map((item, index) => (
                <div
                  key={item.id}
                  className={`p-4 ${
                    index !== cartItems.length - 1 ? "border-b" : ""
                  }`}
                >
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    {/* Product */}
                    <div className="flex items-center gap-4 md:w-5/12">
                      <Image
                        src={item.product.image}
                        width={80}
                        height={80}
                        className="rounded object-cover"
                        alt={item.product.product_name}
                      />
                      <h3 className="font-semibold">
                        {item.product.product_name}
                      </h3>
                    </div>

                    {/* Price */}
                    <div className="md:w-2/12 text-center">
                      $
                      {item.product.off_price
                        ? item.product.off_price.toFixed(2)
                        : item.product.price.toFixed(2)}
                    </div>

                    {/* Quantity */}
                    <div className="md:w-2/12 flex justify-center">
                      <div className="flex border rounded">
                        <form
                          action={async () => {
                            "use server";
                            await updateCartQuantity(
                              item.product.id,
                              item.id,
                              item.quantity - 1,
                            );
                          }}
                        >
                          <button className="p-2" disabled={item.quantity <= 1}>
                            <Minus size={16} />
                          </button>
                        </form>

                        <span className="px-4 py-2">{item.quantity}</span>

                        <form
                          action={async () => {
                            "use server";
                            await updateCartQuantity(
                              item.product.id,
                              item.id,
                              item.quantity + 1,
                            );
                          }}
                        >
                          <button
                            className="p-2"
                            disabled={item.quantity >= item.product.quantity}
                          >
                            <Plus size={16} />
                          </button>
                        </form>
                      </div>
                    </div>

                    {/* Total */}
                    <div className="md:w-2/12 text-center font-bold">
                      ${item.price.toFixed(2)}
                    </div>

                    {/* Remove */}
                    <div className="md:w-1/12 text-right">
                      <form
                        action={async () => {
                          "use server";
                          await removeCartItem(item.id);
                        }}
                      >
                        <button className="text-gray-400 hover:text-red-500">
                          <Trash2 size={18} />
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                href="/products"
                className="flex items-center gap-2 px-6 py-3 border rounded"
              >
                <ArrowLeft size={16} />
                Continue Shopping
              </Link>

              <form action={clearCart}>
                <button className="px-6 py-3 border border-red-400 text-red-600 rounded">
                  Clear Cart
                </button>
              </form>
            </div>
          </div>

          {/* RIGHT */}
          <div className="lg:w-1/3">
            <div className="border rounded-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-6">Cart Totals</h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <form action={checkoutAction} className="mt-6">
                <label htmlFor="paymentMethod" className="flex text-[#FB2E86]">
                  <CreditCard size={20} className="inline-block mr-2" />
                  Select Your Payment Method
                </label>
                <select
                  name="payment_method"
                  className="w-full border p-3 rounded mb-4"
                >
                  <option value="cod">Cash On Delivery</option>
                </select>

                <button
                  type="submit"
                  className="w-full bg-[#FB2E86] text-white py-4 rounded-lg"
                >
                  Proceed To Checkout
                </button>
              </form>

              <div className="mt-6 text-sm text-gray-500 flex gap-2">
                <Truck size={16} />
                Shipping calculated at checkout
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CartPage;
