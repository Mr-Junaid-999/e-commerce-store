import { createClient } from "@/lib/server";
import { redirect } from "next/navigation";
import Input from "../components/ui/input";
import PasswordInput from "../components/ui/PasswordInput";
import Alert from "../components/ui/alert";
import handleLogin from "./action";
import Link from "next/link";
export default async function login({ searchParams }) {
  const params = await searchParams;
  const error = params.error;
  const success = params.success;
  const supabaseServer = await createClient();
  const {
    data: { session },
  } = await supabaseServer.auth.getSession();
  if (session) {
    const { data: admin } = await supabaseServer
      .from("users")
      .select("*")
      .eq("user_id", session.user.id)
      .eq("role", "admin")
      .single();

    if (admin) {
      redirect("/admin/dashboard");
    } else {
      redirect("/");
    }
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
      <div className="flex flex-col items-center justify-center border py-4 px-12">
        <h1 className="text-4xl font-bold mb-4">Login</h1>
        <p className=" text-[16px] mb-8 text-gray-400 ">
          Welcome back! Please enter your credentials to access your account.
        </p>
        {/* Show error from URL if exists */}
        {error && <Alert type="error" message={error} />}

        {/* Show success message if exists */}
        {success && <Alert type="success" message={success} />}
        <form action={handleLogin} className="w-full max-w-sm">
          <Input name="email" />
          <PasswordInput name="password" required={true} />
          <div className="mb-6">
            <p>
              If you have not any account{" "}
              <Link
                href={"/signup"}
                className="text-[#FB2E86] hover:text-[#0D0E43] transition duration-300 text-[16px] font-medium"
              >
                Click Here!
              </Link>
            </p>
          </div>
          <div className="flex w-full items-center justify-between">
            <button
              className="nav_button w-full font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Signin
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
