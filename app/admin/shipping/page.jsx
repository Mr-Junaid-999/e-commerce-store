import { Card, CardContent } from "@/app/admin/components/ui/card";
import { Truck, Globe, Clock, Mail } from "lucide-react";
import { createClient } from "@/lib/server";

export default async function ShippingPage() {
  const supabase = await createClient();
  const { data: shippingOrders, error } = await supabase
    .from("orders")
    .select(
      `id,  created_at, status,TrackingID, addresses(full_name,address_line1,city,country)`
    )
    .eq("status", "shipped");

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-bold mb-1 text-white">
          Shipping Information
        </h1>
        <p className="text-gray-400">
          Choose your preferred delivery method and track your shipment easily.
        </p>
      </div>

      {/* Shipping Options */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="bg-[#1E293B] hover:shadow-lg transition-all duration-200">
          <CardContent className="p-6 space-y-3">
            <div className="flex items-center gap-3">
              <Truck className="text-yellow-400" />
              <h2 className="text-xl font-semibold text-white">
                Standard Shipping
              </h2>
            </div>
            <p className="text-gray-300">
              Delivery within <strong>5–7 business days</strong> across all
              regions.
            </p>
            <p className="text-green-400 font-medium">
              Free for orders above $50
            </p>
            <p className="text-sm text-gray-400">Cost: $5.00</p>
          </CardContent>
        </Card>

        <Card className="bg-[#1E293B] hover:shadow-lg transition-all duration-200">
          <CardContent className="p-6 space-y-3">
            <div className="flex items-center gap-3">
              <Clock className="text-blue-400" />
              <h2 className="text-xl font-semibold text-white">
                Express Shipping
              </h2>
            </div>
            <p className="text-gray-300">
              Delivery within <strong>2–3 business days</strong> with real-time
              tracking.
            </p>
            <p className="text-green-400 font-medium">
              Free for orders above $100
            </p>
            <p className="text-sm text-gray-400">Cost: $12.00</p>
          </CardContent>
        </Card>

        <Card className="bg-[#1E293B] hover:shadow-lg transition-all duration-200">
          <CardContent className="p-6 space-y-3">
            <div className="flex items-center gap-3">
              <Globe className="text-pink-400" />
              <h2 className="text-xl font-semibold text-white">
                International Shipping
              </h2>
            </div>
            <p className="text-gray-300">
              Worldwide delivery via <strong>DHL Express</strong> within{" "}
              <strong>5–10 business days</strong>.
            </p>
            <p className="text-sm text-gray-400">Cost: $25.00</p>
          </CardContent>
        </Card>
      </div>

      {/* Address Section */}
      <Card className="bg-[#161B22]">
        <CardContent className="p-6 space-y-3">
          {shippingOrders && shippingOrders.length > 0 ? (
            <div>
              <h2 className="text-lg font-semibold mb-2 text-white">
                Recent Shipping Orders
              </h2>
              <div className="max-h-64 overflow-y-auto">
                {shippingOrders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-[#1E293B] p-4 rounded-lg mb-3"
                  >
                    <p className="text-white font-medium">
                      Order ID: {order.id}
                    </p>
                    <p className="text-gray-300 text-sm">
                      Shipped to: {order.addresses.full_name},{" "}
                      {order.addresses.address_line1}, {order.addresses.city},{" "}
                      {order.addresses.country}
                    </p>
                    <p className="text-gray-400 text-xs">
                      Status: {order.status} | Shipped on:{" "}
                      {new Date(order.created_at).toLocaleDateString()}
                    </p>
                    <p className="text-gray-400 text-xs">
                      Tracking ID: {order.TrackingID ? order.TrackingID : "N/A"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-gray-300">No shipping orders found.</p>
          )}
        </CardContent>
      </Card>

      {/* Tracking Info */}
      <Card className="bg-[#1E293B]">
        <CardContent className="p-6 space-y-3">
          <h2 className="text-lg font-semibold mb-2 text-white">
            Track Your Order
          </h2>
          <input
            type="text"
            placeholder="Enter Tracking ID"
            className="w-full bg-[#111827] border border-gray-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <button className="bg-yellow-400 hover:bg-yellow-600 text-black font-medium px-4 py-2 rounded-lg">
            Track Now
          </button>
        </CardContent>
      </Card>

      {/* Support Info */}
      <Card className="bg-[#161B22]">
        <CardContent className="p-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold mb-1 text-white">
              Need Help?
            </h2>
            <p className="text-gray-300">
              Our support team is available 24/7 to assist you.
            </p>
          </div>
          <div className="flex items-center gap-2 text-yellow-400">
            <Mail />
            <a href="mailto:shipping@store.com" className="underline">
              mr.junaidulhassan@gmail.com
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
