import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const privatePaths = ["/manage"]
const AuthPaths = ["/login"]

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const accessToken = request.cookies.get("accessToken")?.value
  console.log("[PROXY]", pathname, "| token:", accessToken)
  if (privatePaths.some((path) => pathname.startsWith(path)) && !accessToken) {
    return NextResponse.redirect(new URL("/login", request.url))
  }
  if (AuthPaths.some((path) => pathname.startsWith(path)) && accessToken) {
    return NextResponse.redirect(new URL("/", request.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ["/manage/:path*", "/login"],
}
