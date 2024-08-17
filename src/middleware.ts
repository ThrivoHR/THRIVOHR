import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const privatePaths = ["/home"];
const authPaths = ["/login"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const sessionToken = req.cookies.get("sessionToken")?.value;

  // Redirect root path to login if no session token
  if (pathname === "/" && !sessionToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Redirect to home if authenticated and trying to access root
  if (pathname === "/" && sessionToken) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  if (privatePaths.some((path) => pathname.startsWith(path)) && !sessionToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Redirect to home if authenticated and trying to access login/register
  if (authPaths.some((path) => pathname.startsWith(path)) && sessionToken) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  return NextResponse.next();
}

// Update the matcher to include the root path
export const config = {
  matcher: ["/", "/login", "/home/:path*"],
};