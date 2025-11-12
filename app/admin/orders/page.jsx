"use client";
import { useState } from "react";
import { Card, CardContent } from "@/app/admin/components/ui/card";

const initialOrders = [
  { id: "#1001", customer: "Ali Khan", status: "Pending", total: "$250" },
  { id: "#1002", customer: "Ayesha Noor", status: "Shipping", total: "$120" },
  { id: "#1003", customer: "Bilal Ahmed", status: "Completed", total: "$560" },
];

export default function OrdersPage() {
  const [orders, setOrders] = useState(initialOrders);
  const [filter, setFilter] = useState("All");
  const [editingId, setEditingId] = useState(null); // track which order is being edited

  const handleStatusChange = (id, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
    );
    setEditingId(null); // exit edit mode
  };

  const filteredOrders =
    filter === "All" ? orders : orders.filter((o) => o.status === filter);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Orders</h1>

      {/* Filter Buttons */}
      <div className="flex gap-3">
        {["All", "Pending", "Shipping", "Completed", "Cancelled"].map((btn) => (
          <button
            key={btn}
            onClick={() => setFilter(btn)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              filter === btn
                ? "bg-yellow-400 text-[#1E293B]"
                : "bg-[#1E293B] text-gray-300 hover:bg-[#2E3A52]"
            }`}
          >
            {btn}
          </button>
        ))}
      </div>

      {/* Orders Table */}
      <Card className="bg-[#161B22]">
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-separate  border-spacing-y-3 ">
              <thead className="text-gray-400 text-sm">
                <tr className=" ">
                  <th className="p-3 w-1/5">ID</th>
                  <th className="p-3 w-1/5">Customer</th>
                  <th className="p-3 w-1/5">Status</th>
                  <th className="p-3 w-1/5">Total</th>
                  <th className="p-3 w-1/5">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className=" bg-[#1E293B] overflow-hidden rounded-xl [&>td:first-child]:rounded-l-xl [&>td:last-child]:rounded-r-xl mb-3"
                  >
                    <td className="p-3 w-1/5">{order.id}</td>
                    <td className="p-3 w-1/5">{order.customer}</td>
                    <td className="p-3 w-1/5">{order.status}</td>
                    <td className="p-3 w-1/5">{order.total}</td>
                    <td className="p-3 w-1/5">
                      {editingId === order.id ? (
                        <div className="flex gap-2">
                          <select
                            value={order.status}
                            onChange={(e) =>
                              handleStatusChange(order.id, e.target.value)
                            }
                            className="bg-[#0F172A] p-2 rounded-md text-sm"
                          >
                            <option>Pending</option>
                            <option>Shipping</option>
                            <option>Completed</option>
                            <option>Cancelled</option>
                          </select>
                          <button
                            onClick={() => setEditingId(null)}
                            className="px-3 py-1 bg-gray-600 text-white text-sm rounded-md font-medium hover:bg-gray-500 transition"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setEditingId(order.id)}
                          className="px-3 py-1 bg-yellow-400 text-[#111827] text-sm rounded-md font-medium hover:bg-yellow-300 transition"
                        >
                          Edit
                        </button>
                      )}
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
