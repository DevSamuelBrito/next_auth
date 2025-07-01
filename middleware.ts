import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = [
  "/dashboard",
  "/forget-password",
  "/changename",
  "/changepassword",
  "/changepicture",
  "/changeusername",
];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Verifica se a rota é protegida (exato ou começa com)
  const isProtected = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  if (!isProtected) return NextResponse.next();

  const token =
    req.cookies.get("next-auth.session-token")?.value ||
    req.cookies.get("__Secure-next-auth.session-token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/forget-password/:path*",
    "/changename/:path*",
    "/changepassword/:path*",
    "/changepicture/:path*",
    "/changeusername/:path*",
  ],
};
