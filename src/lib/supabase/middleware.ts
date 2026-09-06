import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const protectedPaths = [
  "/dashboard",
  "/leads",
  "/clients",
  "/proposals",
  "/projects",
  "/invoices",
  "/ai-assistant",
  "/settings",
];

export async function updateSession(request: NextRequest) {
  const response = NextResponse.next({ request });

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return response;
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            response.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isProtected = protectedPaths.some((path) => request.nextUrl.pathname === path || request.nextUrl.pathname.startsWith(`${path}/`));
  if (!user && isProtected) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return response;
}
