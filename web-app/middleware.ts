import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Protected routes that require authentication
const protectedRoutes = [
  "/dashboard",
  "/income",
  "/expenses",
  "/insights",
  "/settings",
];

// Auth routes that authenticated users shouldn't access
const authRoutes = ["/sign-in", "/sign-up"];

// Public routes
const publicRoutes = ["/", "/onboarding"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if user has auth token in cookies or we need to check localStorage
  // Since we're using localStorage for mock auth, we'll let the client-side handle it
  // and just protect the routes at the component level

  // For now, this middleware is a placeholder for future server-side auth
  return NextResponse.next();
}

// Configure which routes use this middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
