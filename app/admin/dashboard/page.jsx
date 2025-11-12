// app/admin/dashboard/page.jsx
"use client";
import React from "react";
import createClient from "@/lib/client";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/app/admin/components/ui/card";
import { Bell, MessageSquare } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect } from "react";
const data = [
  { name: "Mon", today: 12, yesterday: 20 },
  { name: "Tue", today: 25, yesterday: 30 },
  { name: "Wed", today: 20, yesterday: 15 },
  { name: "Thu", today: 38, yesterday: 22 },
  { name: "Fri", today: 29, yesterday: 35 },
];

export default function DashboardPage() {
  const router = useRouter();
  async function fetchData() {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    console.log("User:", user.id);
    if (!user) {
      redirect("/login");
    } else {
      const { data: admin } = await supabase
        .from("users")
        .select("*")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .single();
      if (!admin) {
        redirect("/login");
      }
    }
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Total Revenue</h1>
          <p className="text-3xl font-semibold text-green-400">$45,365.00</p>
        </div>

        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search"
            className="bg-[#1A1F2B] px-4 py-2 rounded-lg text-sm focus:outline-none"
          />
          <Bell className="text-yellow-400" />
          <MessageSquare className="text-pink-400" />
          {/* <img
            src=""
            alt="image"
            className="w-9 h-9 rounded-full border border-gray-600"
          /> */}
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-3 gap-6">
        <Card className="bg-[#1E40AF] text-center">
          <CardContent className="py-6">
            <p className="text-lg">Shipped Orders</p>
            <h2 className="text-4xl font-bold">67</h2>
          </CardContent>
        </Card>
        <Card className="bg-[#DC2626] text-center">
          <CardContent className="py-6">
            <p className="text-lg">Pending Orders</p>
            <h2 className="text-4xl font-bold">09</h2>
          </CardContent>
        </Card>
        <Card className="bg-[#8B5CF6] text-center">
          <CardContent className="py-6">
            <p className="text-lg">New Orders</p>
            <h2 className="text-4xl font-bold">35</h2>
          </CardContent>
        </Card>
      </div>

      {/* Sales Chart */}
      <Card className="bg-[#111827]">
        <CardContent className="p-6">
          <h3 className="text-lg mb-4">Todays Sales</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data}>
              <XAxis dataKey="name" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="today"
                stroke="#60A5FA"
                strokeWidth={3}
              />
              <Line
                type="monotone"
                dataKey="yesterday"
                stroke="#F472B6"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="bg-[#1A1F2B]">
        <CardContent className="p-6">
          <h3 className="text-lg mb-4">Recent Activity</h3>
          <ul className="space-y-3">
            <li className="flex justify-between items-center">
              <span>Confirm order update</span>
              <span className="bg-yellow-500 px-3 py-1 rounded text-xs">
                URGENT
              </span>
            </li>
            <li className="flex justify-between items-center">
              <span>Finish shipping update</span>
              <span className="bg-red-500 px-3 py-1 rounded text-xs">
                URGENT
              </span>
            </li>
            <li className="flex justify-between items-center">
              <span>Create new order</span>
              <span className="bg-green-500 px-3 py-1 rounded text-xs">
                NEW
              </span>
            </li>
            <li className="flex justify-between items-center">
              <span>Update payment report</span>
              <span className="bg-gray-500 px-3 py-1 rounded text-xs">
                DEFAULT
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
