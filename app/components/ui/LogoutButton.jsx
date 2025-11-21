// components/LogoutButton.jsx
import { createClient } from "@/lib/server";
import { redirect } from "next/navigation";

async function handleLogout() {
  "use server";
  const supabase = await createClient();
  await supabase.auth.signOut();

  redirect("/login");
}

export default function LogoutButton({ className = "" }) {
  return (
    <form action={handleLogout}>
      <button
        type="submit"
        className={`bg-[#8A2BE2] text-white hover:bg-[#5b3987] px-6 py-2 rounded-md  transition ${className}`}
      >
        Logout
      </button>
    </form>
  );
}
