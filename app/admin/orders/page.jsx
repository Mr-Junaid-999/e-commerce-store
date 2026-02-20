// app/admin/orders/page.jsx
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/server";
import { Card, CardContent } from "@/app/admin/components/ui/card";
import Order_items from "@/app/admin/components/Order_items";
import UpdateStatusForm from "../components/UpdateStatusForm";
// ✅ Server Action to Update Status
async function updateOrderStatus(formData) {
  "use server";
  console.log("Update Order Status called");
  const id = formData.get("id");
  const newStatus = formData.get("status");
  const payment_status = formData.get("payment_status");
  const tracking_id =
    formData.get("tracking_id") != null ? formData.get("tracking_id") : "";
  console.log("payment_status:", payment_status, "status :", newStatus);
  const supabase = await createClient();

  if (newStatus == "cancelled") {
    const { data, error } = await supabase
      .from("order_items")
      .select(`product_id, quantity`)
      .eq("order_id", id);
    console.log("Order items to restock:", data, "Error:", error);
    for (const item of data) {
      const { data: productData, error: productError } = await supabase
        .from("products")
        .select("quantity")
        .eq("id", item.product_id)
        .single();
      if (productError) {
        console.error(
          `Error fetching product ${item.product_id}:`,
          productError,
        );
        continue;
      }
      const newStock = productData.quantity + item.quantity;
      const { error: updateError } = await supabase
        .from("products")
        .update({ quantity: newStock })
        .eq("id", item.product_id);
      if (updateError) {
        console.error(
          `Error updating stock for product ${item.product_id}:`,
          updateError,
        );
      }
    }
  }

  console.log("Updateing order", {
    status: newStatus,
    payment_status:
      newStatus === "delivered"
        ? "paid"
        : newStatus === "cancelled"
          ? "refunded"
          : "pending",
    created_at: new Date(),
    TrackingID: tracking_id,
  });

  const { data, error } = await supabase
    .from("orders")
    .update({
      status: newStatus,
      payment_status:
        newStatus === "delivered"
          ? "paid"
          : newStatus === "cancelled"
            ? "refunded"
            : "pending",
      created_at: new Date(),
      TrackingID: tracking_id,
    }) // ✅ correct
    .eq("id", id)
    .select(); // 👈 important for debugging
  if (error) {
    console.error("Error updating order status:", error);
  } else {
    // ✅ Clear cache and force revalidation
    revalidatePath("/admin/orders");

    // ✅ Then redirect
    redirect("/admin/orders");
  }
}

export default async function OrdersPage({ searchParams }) {
  const params = await searchParams;
  const supabase = await createClient();

  // ✅ Auth check
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) redirect("/login");

  // ✅ Fetch orders
  let { data: orders, error } = await supabase
    .from("orders")
    .select(`id,status,total,payment_status,TrackingID,addresses(full_name)`)
    .order("created_at", { ascending: false });

  console.log("params:", params?.status);
  // ✅ Apply server-side filter
  const statusFilter = params?.status || "All";
  const filteredOrders =
    statusFilter === "All"
      ? orders
      : orders.filter((o) => o.status === statusFilter);
  console.log(
    "Orders:",
    orders.filter((o) => o.status === statusFilter),
  );
  console.log("Filtered Orders:", filteredOrders);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Orders</h1>

      {/* ✅ Filter Buttons */}
      <div className="flex gap-3">
        {["All", "pending", "shipped", "delivered", "cancelled"].map((btn) => (
          <a
            key={btn}
            href={`/admin/orders?status=${btn}`}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              statusFilter === btn
                ? "bg-yellow-400 text-[#1E293B]"
                : "bg-[#1E293B] text-gray-300 hover:bg-[#2E3A52]"
            }`}
          >
            {btn}
          </a>
        ))}
      </div>

      {/* ✅ Orders Table */}
      <Card className="bg-[#161B22]">
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-separate border-spacing-y-3">
              <thead className="text-gray-400 text-sm">
                <tr>
                  <th className="p-3 w-1">ID</th>
                  <th className="p-3 w-1">Customer</th>
                  <th className="p-3 w-1"> View Items</th>
                  <th className="p-3 w-1">Status</th>
                  <th className="p-3 w-1">Total</th>
                  <th className="p-3 w-1 text-center">Change Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="bg-[#1E293B] overflow-hidden rounded-xl mb-3"
                  >
                    <td className="p-3">{order.id}</td>
                    <td className="p-3">{order.addresses.full_name}</td>
                    <td className="p-3">
                      <Order_items orderId={order.id} />
                    </td>
                    <td className="p-3 font-medium">{order.status}</td>
                    <td className="p-3">${order.total}</td>
                    <td className="p-3 text-center">
                      <UpdateStatusForm
                        order={order}
                        updateOrderStatus={updateOrderStatus}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
