"use server";
import { ShoppingCart, Search } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/server";
import LogoutButton from "./ui/LogoutButton";
import NavMenu from "./ui/Nav_Menu";
import { redirect } from "next/navigation";
export default async function Header({ searchParams }) {
  const Active = (await searchParams?.active) || "home";
  let isAdmin = false;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const { data: currentUser } = await supabase
      .from("users")
      .select("user_id, role")
      .eq("user_id", user.id)
      .single();
    isAdmin = currentUser?.role === "admin" ? true : false;
  } else {
    isAdmin = false;
  }

  return (
    <header className="w-full border-b border-gray-200 fixed z-10">
      {/* Top Info Bar */}
      <div className="bg-[#8A2BE2] text-white text-sm">
        <div className="max-w-[1080px] mx-auto flex justify-between items-center py-2 px-4">
          <div className="flex gap-4">
            <span>📧 mr.junaidulhassan@gmail.com</span>
            <span>📞 +92 3000115907</span>
          </div>
          <div className="flex items-center ">
            {isAdmin && (
              <Link
                href="/admin/dashboard"
                className="Link bg-[#8A2BE2] text-white hover:bg-[#5b3987] px-6 py-2 rounded-md  transition"
              >
                Admin Dashboard
              </Link>
            )}
            {user ? (
              <LogoutButton />
            ) : (
              <Link href="/login" className="Link hover:underline">
                Login
              </Link>
            )}

            <Link
              href="/wishlist"
              className="Link bg-[#8A2BE2] text-white hover:bg-[#5b3987] px-6 py-2 rounded-md  transition"
            >
              Wishlist
            </Link>
            <Link
              href="/add-to-cart"
              className="bg-[#8A2BE2] text-white hover:bg-[#5b3987] px-6 py-2 rounded-md  transition"
            >
              <ShoppingCart className="w-5 h-5 cursor-pointer" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="bg-white">
        <div className="max-w-[1080px] mx-auto flex flex-wrap items-center justify-between py-4 px-4 gap-3">
          {/* Logo */}
          <h1 className="text-2xl font-bold text-[#1E293B]">Hekto</h1>

          <NavMenu />

          {/* Search Bar */}
          <div className="flex border border-gray-300 rounded overflow-hidden w-full md:w-auto">
            <input
              type="text"
              className="px-3 py-1.5 outline-none w-full md:w-64"
            />
            <button className="bg-pink-500 text-white px-4 py-1.5 hover:bg-pink-600">
              <Search className="w-5 h-5 cursor-pointer" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
