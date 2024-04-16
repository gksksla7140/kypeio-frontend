import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const url = request.nextUrl;

  // Parse the query parameters from the URL
  const searchParams = new URLSearchParams(url.search);

  // Access individual query parameters using the get method
  const playerId = searchParams.get("playerId");

  // Add new request headers
  if (playerId) {
    requestHeaders.set("x-player-id", playerId);
  }

  // You can also set request headers in NextResponse.rewrite
  return NextResponse.next();
}

export const config = {
  matcher: "/game/play/:gameId*",
};
