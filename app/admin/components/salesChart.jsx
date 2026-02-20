"use client";
import { Card, CardContent } from "@/app/admin/components/ui/card";
import { useEffect, useState, useMemo } from "react";
import createClient from "@/lib/client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Mon", today: 12, yesterday: 20 },
  { name: "Tue", today: 25, yesterday: 12 },
  { name: "Wed", today: 20, yesterday: 25 },
  { name: "Thu", today: 38, yesterday: 20 },
  { name: "Fri", today: 29, yesterday: 38 },
];

export default function SalesChart() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const supabase = createClient();
      const { data, error } = await supabase.from("orders").select("*");
      if (error) {
        console.error("Error fetching orders:", error);
      } else {
        setOrders(data);
      }
    }
    fetchData();
  }, []);

  const chartData = useMemo(() => {
    if (!orders.length) return [];

    const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const toDateStr = (date) => date.toISOString().split("T")[0];

    const today = new Date();

    // Generate last 7 days (including today)
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() - (6 - i)); // oldest first, newest last
      return d;
    });

    return last7Days.map((date) => {
      const dateStr = toDateStr(date);

      const yesterday = new Date(date);
      yesterday.setDate(date.getDate() - 1);
      const yesterdayStr = toDateStr(yesterday);

      const todayCount = orders.reduce(
        (sum, order) =>
          sum + (order.created_at.split("T")[0] === dateStr ? 1 : 0),
        0,
      );

      const yesterdayCount = orders.reduce(
        (sum, order) =>
          sum + (order.created_at.split("T")[0] === yesterdayStr ? 1 : 0),
        0,
      );

      return {
        name: DAYS[date.getDay()],
        today: todayCount,
        yesterday: yesterdayCount,
      };
    });
  }, [orders]);

  return (
    <div>
      {/* Sales Chart */}
      <Card className="bg-[#111827]">
        <CardContent className="p-6">
          <h3 className="text-lg mb-4 text-white">Todays Sales</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
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
    </div>
  );
}
