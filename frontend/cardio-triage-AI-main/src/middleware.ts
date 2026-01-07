import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// MOCK RBAC Configuration
// In a real app, this would use NextAuth.js or Clerk session tokens
const ROLE_PERMISSIONS = {
    'doctor': ['/intake', '/dashboard', '/admin'],
    'nurse': ['/intake'],
    'guest': []
}

export function middleware(request: NextRequest) {
    // 1. Simulate getting user role (e.g., from cookie or header)
    // For demo purposes, we assume everyone is a 'doctor' unless a header says otherwise
    // Try sending a header `x-user-role: nurse` to test restriction
    const role = request.headers.get('x-user-role') || 'doctor'
    const path = request.nextUrl.pathname

    // 2. Define protected routes pattern
    if (path.startsWith('/admin')) {
        if (role !== 'doctor') {
            return NextResponse.redirect(new URL('/', request.url))
        }
    }

    // 3. Add Custom Headers for downstream components
    const response = NextResponse.next()
    response.headers.set('x-current-role', role)

    return response
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}
