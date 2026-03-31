import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith("/wnetrza-studio/panel") &&
    !req.auth?.user
  ) {
    return NextResponse.redirect(new URL("/wnetrza-studio", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/wnetrza-studio/panel/:path*"],
};
