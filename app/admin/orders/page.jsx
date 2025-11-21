// app/admin/orders/page.jsx
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/server";
import { Card, CardContent } from "@/app/admin/components/ui/card";

// ✅ Server Action to Update Status
async function updateOrderStatus(formData) {
  "use server";

  const id = formData.get("id");
  const newStatus = formData.get("status");

  const supabase = await createClient();
  await supabase.from("orders").update({ status: newStatus }).eq("id", id);

  // revalidate this page (refresh data)
  revalidatePath("/admin/orders");
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
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !orders?.length) {
    orders = [
      { id: "#1001", customer: "Ali Khan", status: "Pending", total: "$250" },
      {
        id: "#1002",
        customer: "Ayesha Noor",
        status: "Shipping",
        total: "$120",
      },
      {
        id: "#1003",
        customer: "Bilal Ahmed",
        status: "Completed",
        total: "$560",
      },
    ];
  }

  // ✅ Apply server-side filter
  const statusFilter = params?.status || "All";
  const filteredOrders =
    statusFilter === "All"
      ? orders
      : orders.filter((o) => o.status === statusFilter);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Orders</h1>

      {/* ✅ Filter Buttons */}
      <div className="flex gap-3">
        {["All", "Pending", "Shipping", "Completed", "Cancelled"].map((btn) => (
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
                  <th className="p-3 w-1/5">ID</th>
                  <th className="p-3 w-1/5">Customer</th>
                  <th className="p-3 w-1/5">Status</th>
                  <th className="p-3 w-1/5">Total</th>
                  <th className="p-3 w-1/5 text-center">Change Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="bg-[#1E293B] overflow-hidden rounded-xl mb-3"
                  >
                    <td className="p-3">{order.id}</td>
                    <td className="p-3">{order.customer}</td>
                    <td className="p-3 font-medium">{order.status}</td>
                    <td className="p-3">{order.total}</td>
                    <td className="p-3 text-center">
                      <form action={updateOrderStatus}>
                        <input type="hidden" name="id" value={order.id} />
                        <select
                          name="status"
                          defaultValue={order.status}
                          className="bg-[#0F172A] text-gray-200 px-3 py-1 rounded-md border border-gray-700"
                          // auto-submit on change
                        >
                          {[
                            "Pending",
                            "Shipping",
                            "Completed",
                            "Cancelled",
                          ].map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </form>
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
