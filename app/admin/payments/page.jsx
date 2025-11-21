"use client";
import { Card, CardContent } from "@/app/admin/components/ui/card";
import {
  CreditCard,
  DollarSign,
  ArrowDownRight,
  ArrowUpRight,
  RefreshCw,
} from "lucide-react";

export default function PaymentsPage() {
  const transactions = [
    {
      id: "TXN-12345",
      customer: "John Doe",
      amount: "$120.00",
      method: "Stripe",
      status: "Completed",
      date: "Nov 10, 2025",
    },
    {
      id: "TXN-12346",
      customer: "Sarah Smith",
      amount: "$80.00",
      method: "PayPal",
      status: "Pending",
      date: "Nov 9, 2025",
    },
    {
      id: "TXN-12347",
      customer: "Ali Khan",
      amount: "$55.00",
      method: "Stripe",
      status: "Refunded",
      date: "Nov 7, 2025",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-bold mb-1">Payments Dashboard</h1>
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
              <h2 className="text-lg font-semibold">Total Revenue</h2>
            </div>
            <p className="text-3xl font-bold text-white">$45,365.00</p>
            <p className="text-gray-400 text-sm">+12% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-[#1E293B] hover:shadow-lg transition-all">
          <CardContent className="p-6 space-y-3">
            <div className="flex items-center gap-3">
              <ArrowDownRight className="text-yellow-400" />
              <h2 className="text-lg font-semibold">Pending Payments</h2>
            </div>
            <p className="text-3xl font-bold text-white">3 Orders</p>
            <p className="text-gray-400 text-sm">Awaiting confirmation</p>
          </CardContent>
        </Card>

        <Card className="bg-[#1E293B] hover:shadow-lg transition-all">
          <CardContent className="p-6 space-y-3">
            <div className="flex items-center gap-3">
              <ArrowUpRight className="text-pink-400" />
              <h2 className="text-lg font-semibold">Refunds Processed</h2>
            </div>
            <p className="text-3xl font-bold text-white">$230.00</p>
            <p className="text-gray-400 text-sm">2 refunds this week</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card className="bg-[#161B22]">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
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
                  <td className="p-3">{txn.id}</td>
                  <td>{txn.customer}</td>
                  <td>{txn.amount}</td>
                  <td>{txn.method}</td>
                  <td>
                    <span
                      className={`px-3 py-1 text-xs rounded-full ${
                        txn.status === "Completed"
                          ? "bg-green-500/20 text-green-400"
                          : txn.status === "Pending"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {txn.status}
                    </span>
                  </td>
                  <td>{txn.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Payment Method Settings */}
      <Card className="bg-[#1E293B]">
        <CardContent className="p-6 space-y-3">
          <h2 className="text-xl font-semibold mb-3">Payment Method</h2>
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
            <h2 className="text-lg font-semibold mb-1">
              Need to issue a refund?
            </h2>
            <p className="text-gray-400 text-sm">
              Process refunds easily for customer transactions.
            </p>
          </div>
          <button className="bg-pink-500 hover:bg-pink-600 text-white font-medium px-4 py-2 rounded-lg flex items-center gap-2">
            <RefreshCw className="w-4 h-4" /> Issue Refund
          </button>
        </CardContent>
      </Card>
    </div>
  );
}
