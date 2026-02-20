import { redirect } from "next/navigation";
import { createClient } from "@/lib/server";
import { Card, CardContent } from "@/app/admin/components/ui/card";
import { Bell, MessageSquare } from "lucide-react";
import SalesChart from "../components/salesChart";
import Link from "next/link";
export default async function DashboardPage() {
  // ✅ Server-side auth check
  const supabase = await createClient();

  const { data: transactions, error } = await supabase
    .from("orders")
    .select(
      `id,status, total, payment_method, payment_status, created_at, addresses(full_name)`
    );

  console.log("Transactions:", transactions);

  const pendingOrder = transactions.reduce(
    (sum, txn) =>
      sum + (txn.status === "shipped" || txn.status === "pending" ? 1 : 0),
    0
  );

  const totalRevenue = transactions.reduce(
    (sum, txn) =>
      sum +
      parseFloat(txn.total && txn.payment_status === "paid" ? txn.total : 0),
    0
  );
  const confirmedOrder = transactions.reduce(
    (sum, txn) => sum + parseFloat(txn.status === "delivered" ? 1 : 0),
    0
  );
  const shippedOrder = transactions.reduce(
    (sum, txn) =>
      sum + parseFloat(txn.total && txn.status === "shipped" ? 1 : 0),
    0
  );
  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Total Revenue</h1>
          <p className="text-3xl font-semibold text-green-400">
            ${totalRevenue.toFixed(2)}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Bell className="text-yellow-400" />
          <MessageSquare className="text-pink-400" />
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-3 gap-6">
        <Card className="bg-[#1E40AF] text-center">
          <CardContent className="py-6">
            <p className="text-lg">Confirmed Orders</p>
            <h2 className="text-4xl font-bold">
              {confirmedOrder > 9 ? "" : 0}
              {confirmedOrder}
            </h2>
          </CardContent>
        </Card>
        <Card className="bg-[#DC2626] text-center">
          <CardContent className="py-6">
            <p className="text-lg">Pending Orders</p>
            <h2 className="text-4xl font-bold">
              {pendingOrder > 9 ? "" : 0}
              {pendingOrder}
            </h2>
          </CardContent>
        </Card>
        <Card className="bg-[#8B5CF6] text-center">
          <CardContent className="py-6">
            <p className="text-lg">Shipped Orders</p>
            <h2 className="text-4xl font-bold">
              {shippedOrder > 9 ? "" : 0}
              {shippedOrder}
            </h2>
          </CardContent>
        </Card>
      </div>

      {/* Sales Chart */}
      <SalesChart />

      {/* Recent Activity */}
      <Card className="bg-[#1A1F2B]">
        <CardContent className="p-6">
          <h3 className="text-lg mb-4 text-white">Quick Actions</h3>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <Link
              href={"/admin/orders"}
              className="bg-yellow-500/20 text-yellow-400 py-2 rounded text-center"
            >
              Review Orders
            </Link>

            <Link
              href={"/admin/shipping"}
              className="bg-blue-500/20 text-blue-400 py-2 rounded text-center"
            >
              Update Shipping
            </Link>

            <Link
              href={"/admin/payments"}
              className="bg-green-500/20 text-green-400 py-2 rounded text-center"
            >
              Payment Report
            </Link>

            <Link
              href={"/admin/products"}
              className="bg-red-500/20 text-red-400 py-2 rounded text-center"
            >
              Cancel Requests
            </Link>
          </div>
          <h3 className="text-lg mb-4 text-white mt-4">Admin Notes</h3>

          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex gap-3 items-start">
              <ul className="w-8/12">
                <span className="text-yellow-400 ">📝</span>
                <span>Verify cancelled orders refund status</span>
              </ul>
              <ul className="w-8/12">
                <span className="text-red-400">⚠️</span>
                <span>High volume of returns this week</span>
              </ul>
            </li>

            <li className="flex gap-3 items-start">
              <ul className="w-8/12">
                <span className="text-purple-400">🚚</span>
                <span>Coordinate with courier for delayed deliveries</span>
              </ul>
              <ul className="w-8/12">
                <span className="text-blue-400">📦</span>
                <span>Pending shipments need tracking IDs</span>
              </ul>
            </li>

            <li className="flex gap-3 items-start">
              <ul className="w-8/12">
                <span className="text-pink-400">💬</span>
                <span>Customer feedback review pending</span>
              </ul>
              <ul className="w-8/12">
                <span className="text-green-400">💰</span>
                <span>COD payment reconciliation pending</span>
              </ul>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
