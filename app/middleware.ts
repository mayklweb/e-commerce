// import { NextRequest, NextResponse } from "next/server";

// const PROTECTED_ROUTES = ["/profile", "/cart"];
// const AUTH_ROUTES = ["/login", "/signup"];

// export function middleware(request: NextRequest) {
//   const token = request.cookies.get("token")?.value;
//   const { pathname } = request.nextUrl;

//   const isProtected = PROTECTED_ROUTES.some((r) => pathname.startsWith(r));
//   const isAuth = AUTH_ROUTES.some((r) => pathname.startsWith(r));

//   if (isProtected && !token) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   // prevent logged-in users from visiting login/signup
//   if (isAuth && token) {
//     return NextResponse.redirect(new URL("/profile", request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/profile/:path*", "/cart/:path*", "/login", "/signup"],
// };
