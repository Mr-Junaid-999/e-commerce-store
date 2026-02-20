import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

export async function middleware(request) {
  try {
    // Create response object
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    // Create Supabase client for middleware
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          get(name) {
            return request.cookies.get(name)?.value;
          },
          set(name, value, options) {
            response.cookies.set({
              name,
              value,
              ...options,
            });
          },
          remove(name, options) {
            response.cookies.set({
              name,
              value: "",
              ...options,
            });
          },
        },
      }
    );

    // Get current user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    const { pathname } = request.nextUrl;

    console.log(
      `Middleware: ${pathname} - User: ${user?.id || "Not logged in"}`
    );

    // 1. ALWAYS ALLOW THESE ROUTES (Even without authentication)
    const alwaysAllowedRoutes = [
      "/",
      "/login",
      "/signup",
      "/forgot-password",
      "/reset-password",
      "/products",
      "/api/auth/callback",
      "/_next",
      "/favicon.ico",
      "/api/logout", // Add logout API if you have one
      "/logout", // Add logout route
    ];

    // Check if current route is always allowed
    const isAlwaysAllowed = alwaysAllowedRoutes.some(
      (route) =>
        pathname === route ||
        pathname.startsWith(`${route}/`) ||
        pathname.startsWith("/_next") ||
        pathname.startsWith("/_next") ||
        pathname.startsWith("/api/auth") ||
        pathname.startsWith("/_next/static") ||
        pathname.startsWith("/_next/image") ||
        pathname.includes(".")
    );

    // If route is always allowed, allow access immediately
    if (isAlwaysAllowed) {
      console.log(`Middleware: Always allowed route - ${pathname}`);
      return response;
    }

    // 2. CHECK AUTHENTICATION for protected routes
    if (!user) {
      console.log("Middleware: No user, redirecting to login");
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // 3. CHECK ADMIN ROUTES
    const adminRoutes = [
      "/admin",
      "/admin/dashboard",
      "/admin/products",
      "/admin/users",
      "/admin/orders",
      "/admin/settings",
    ];

    const isAdminRoute = adminRoutes.some(
      (route) => pathname === route || pathname.startsWith(`${route}/`)
    );

    if (isAdminRoute) {
      // Get user role from database
      const { data: userProfile, error } = await supabase
        .from("users")
        .select("role")
        .eq("user_id", user.id)
        .single();

      if (error || !userProfile || userProfile.role !== "admin") {
        console.log("Middleware: Not admin, redirecting to home");
        return NextResponse.redirect(new URL("/", request.url));
      }

      console.log("Middleware: Admin access granted");
    }

    // 4. ALL OTHER ROUTES - User is logged in, allow access
    return response;
  } catch (error) {
    console.error("Middleware error:", error);

    // Even on error, allow home page
    if (request.nextUrl.pathname === "/") {
      return NextResponse.next();
    }

    // For other errors, redirect to home
    return NextResponse.redirect(new URL("/", request.url));
  }
}

// Configure which routes middleware runs on
export const config = {
  matcher: [
    // Match all paths except static files
    "/((?!_next/static|_next/image|favicon.ico|public/).*)",
  ],
};
