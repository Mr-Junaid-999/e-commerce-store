"use client";
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

const data = [
  { name: "Mon", today: 12, yesterday: 20 },
  { name: "Tue", today: 25, yesterday: 30 },
  { name: "Wed", today: 20, yesterday: 15 },
  { name: "Thu", today: 38, yesterday: 22 },
  { name: "Fri", today: 29, yesterday: 35 },
];

export default function SalesChart() {
  return (
    <div>
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
    </div>
  );
}
