import { Card, CardContent } from "@/app/admin/components/ui/card";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  CreditCard,
  DollarSign,
  ArrowDownRight,
  ArrowUpRight,
  RefreshCw,
} from "lucide-react";
import { createClient } from "@/lib/server";

export default async function PaymentsPage() {
  const supabase = await createClient();

  const { data: transactions, error } = await supabase
    .from("orders")
    .select(
      `id, total, payment_method, payment_status, created_at, addresses(full_name)`
    );
  const pendingPayments = transactions.reduce(
    (sum, txn) => sum + (txn.payment_status === "pending" ? 1 : 0),
    0
  );

  console.log("pendingPayments:", pendingPayments);
  const totalRevenue = transactions.reduce(
    (sum, txn) =>
      sum +
      parseFloat(txn.total && txn.payment_status === "paid" ? txn.total : 0),
    0
  );
  const refundsProcessed = transactions.reduce(
    (sum, txn) =>
      sum +
      parseFloat(
        txn.total && txn.payment_status === "refunded" ? txn.total : 0
      ),
    0
  );
  const refundscount = transactions.reduce(
    (sum, txn) =>
      sum + parseFloat(txn.total && txn.payment_status === "refunded" ? 1 : 0),
    0
  );
  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-bold mb-1 text-white">
          Payments Dashboard
        </h1>
        <p className="text-gray-400">
          Track all your transactions and manage payment activity.
        </p>
      </div>

      {/* Payment Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="bg-[#1E293B] hover:shadow-lg transition-all">
          <CardContent className="p-6 space-y-3">
            <div className="flex items-center gap-3">
              <DollarSign className="text-green-400" />
              <h2 className="text-lg font-semibold text-white">
                Total Revenue
              </h2>
            </div>
            <p className="text-3xl font-bold text-white">${totalRevenue}</p>
            <p className="text-gray-400 text-sm">
              From all completed transactions
            </p>
          </CardContent>
        </Card>

        <Card className="bg-[#1E293B] hover:shadow-lg transition-all">
          <CardContent className="p-6 space-y-3">
            <div className="flex items-center gap-3">
              <ArrowDownRight className="text-yellow-400" />
              <h2 className="text-lg font-semibold text-white">
                Pending Payments
              </h2>
            </div>
            <p className="text-3xl font-bold text-white">
              {pendingPayments} Orders
            </p>
            <p className="text-gray-400 text-sm">Awaiting confirmation</p>
          </CardContent>
        </Card>

        <Card className="bg-[#1E293B] hover:shadow-lg transition-all">
          <CardContent className="p-6 space-y-3">
            <div className="flex items-center gap-3">
              <ArrowUpRight className="text-pink-400" />
              <h2 className="text-lg font-semibold text-white">
                Refunds Processed
              </h2>
            </div>
            <p className="text-3xl font-bold text-white">${refundsProcessed}</p>
            <p className="text-gray-400 text-sm">
              {refundscount} refunds orders issued
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card className="bg-[#161B22]">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-white">
            Recent Transactions
          </h2>
          <table className="w-full text-left border-separate border-spacing-y-2">
            <thead className="text-gray-400 text-sm">
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Method</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((txn) => (
                <tr
                  key={txn.id}
                  className="bg-[#1E293B] hover:bg-[#24304a] transition rounded-lg"
                >
                  <td className="p-3">OID_{txn.id}</td>
                  <td>{txn.addresses.full_name}</td>
                  <td>{txn.total}</td>
                  <td>
                    {txn.payment_method == "cod"
                      ? "Cash On Delivery"
                      : txn.payment_method}
                  </td>
                  <td>
                    <span
                      className={`px-3 py-1 text-xs rounded-full ${
                        txn.payment_status === "paid"
                          ? "bg-green-500/20 text-green-400"
                          : txn.payment_status === "pending"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {txn.payment_status}
                    </span>
                  </td>
                  <td>
                    {new Date(txn.created_at).toISOString().split("T")[0]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Payment Method Settings */}
      <Card className="bg-[#1E293B]">
        <CardContent className="p-6 space-y-3">
          <h2 className="text-xl font-semibold mb-3 text-white">
            Payment Method
          </h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CreditCard className="text-yellow-400" />
              <div>
                <p className="font-medium text-white">Stripe Account</p>
                <p className="text-gray-400 text-sm">
                  Connected • john@store.com
                </p>
              </div>
            </div>
            <button className="bg-yellow-400 hover:bg-yellow-600 text-black font-medium px-4 py-2 rounded-lg">
              Manage
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Refund Section */}
      <Card className="bg-[#161B22]">
        <CardContent className="p-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold mb-1 text-white">
              Need to issue a refund?
            </h2>
            <p className="text-gray-400 text-sm">
              Process refunds easily for customer transactions.
            </p>
          </div>
          <Link
            href={"/admin/payments"}
            className="bg-pink-500 hover:bg-pink-600 text-white font-medium px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" /> Issue Refund
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
