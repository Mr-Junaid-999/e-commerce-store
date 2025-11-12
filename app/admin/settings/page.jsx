"use client";
import { useState } from "react";
import { Card, CardContent } from "@/app/admin/components/ui/card";

export default function SettingsPage() {
  const [storeName, setStoreName] = useState("My E-commerce Store");
  const [email, setEmail] = useState("admin@store.com");

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>

      <Card className="bg-[#161B22]">
        <CardContent className="space-y-4">
          <div>
            <label className="block mb-2 text-gray-300">Store Name</label>
            <input
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              className="bg-[#0F172A] w-full p-3 rounded-md"
            />
          </div>
          <div>
            <label className="block mb-2 text-gray-300">Contact Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#0F172A] w-full p-3 rounded-md"
            />
          </div>
          <button className="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700">
            Save Changes
          </button>
        </CardContent>
      </Card>
    </div>
  );
}
