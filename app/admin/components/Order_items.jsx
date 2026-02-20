"use client";
import React from "react";
import createClient from "@/lib/client";
import { X } from "lucide-react";

import { useState } from "react";
import Image from "next/image";
function Order_items({ orderId }) {
  const supabase = createClient();
  const [view, setView] = useState(false);
  const [order_items, setOrder_items] = useState([]);
  async function fetchItems() {
    console.log("Fetching items for order:", orderId);
    const { data, error } = await supabase
      .from("order_items")
      .select(
        `
        id,
    quantity,
    price,
    products ( product_name,image,id )
  `,
      )
      .eq("order_id", orderId);

    setOrder_items(data);
    setView(!view);
  }
  return (
    <div>
      <button onClick={fetchItems} className="text-blue-400 hover:underline">
        View Items
      </button>
      {view && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          {/* Modal Box */}
          <div className="relative bg-[#0F172A] w-full max-w-lg rounded-xl p-6 shadow-xl">
            {/* ❌ Close Button */}
            <button
              onClick={() => setView(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>

            {/* Title */}
            <h2 className="text-lg font-semibold text-white mb-4">
              Order Items
            </h2>

            {/* Items */}
            <div className="space-y-4 max-h-[400px] overflow-y-auto">
              {order_items.length === 0 && (
                <p className="text-gray-400">No items found</p>
              )}

              {order_items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 border border-gray-700 rounded-lg"
                >
                  <Image
                    width={60}
                    height={60}
                    src={item.products.image}
                    alt={item.products.product_name}
                    className="rounded object-cover"
                  />

                  <div className="flex-1">
                    <p className="text-white font-medium">
                      {item.products.product_name}
                    </p>
                    <p className="text-gray-400 text-sm">
                      Qty: {item.quantity}
                    </p>
                    <p className="text-gray-400 text-sm">
                      Price: ${item.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Order_items;
