import Image from "next/image";
import LogoutButton from "./components/LogoutButton";
import { createClient } from "@/lib/server";
import { redirect } from "next/navigation";
export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login");
  }

  return (
    <div>
      <div className="sub_heading">Primary Background</div>
      <LogoutButton />
    </div>
  );
}
