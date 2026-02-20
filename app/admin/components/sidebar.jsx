// components/admin/Sidebar.jsx
"use client";
import {
  Home,
  Package,
  ShoppingBag,
  Truck,
  CreditCard,
  Images,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
const menuItems = [
  { name: "Dashboard", icon: Home, path: "/admin/dashboard" },
  { name: "Order", icon: ShoppingBag, path: "/admin/orders" },
  { name: "Products", icon: Package, path: "/admin/products" },
  { name: "Shipping", icon: Truck, path: "/admin/shipping" },
  { name: "Payments", icon: CreditCard, path: "/admin/payments" },
  { name: "Media", icon: Images, path: "/admin/media" },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-64 bg-[#111827] flex flex-col justify-between">
      <div>
        <div className="p-6 text-2xl font-bold text-yellow-400">⚡ Admin</div>
        <ul className="space-y-2 px-4">
          {menuItems.map(({ name, icon: Icon, path }) => {
            const isActive = pathname === path;
            return (
              <li key={name}>
                <Link
                  href={path}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg  transition ${
                    isActive
                      ? "bg-yellow-400 text-[#111827] font-semibold"
                      : "text-gray-300 hover:bg-[#1E293B] hover:text-white"
                  }`}
                >
                  <Icon size={20} />
                  {name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="p-6 text-sm text-gray-400">
        <p className="text-white font-medium mb-2">Customer Support</p>

        <p className="leading-relaxed">
          Our support team is available to assist with order issues, payment
          queries, and shipping updates. Please ensure all order details are
          verified before escalating a support request.
        </p>

        <p className="mt-4 text-xs text-gray-500">
          Terms & Services · Privacy Policy
        </p>
      </div>
    </aside>
  );
}
