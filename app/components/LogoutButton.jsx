// components/LogoutButton.jsx
import { createClient } from "@/lib/server";
import { redirect } from "next/navigation";

export default async function LogoutButton({ className = "" }) {
  const handleLogout = async () => {
    "use server";
    const supabase = await createClient();
    await supabase.auth.signOut();

    redirect("/login");
  };

  return (
    <form action={handleLogout}>
      <button type="submit" className={`nav_button ${className}`}>
        Logout
      </button>
    </form>
  );
}
