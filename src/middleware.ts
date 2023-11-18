import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const isPublicPath = path === '/signup' || path === '/' || path === '/forgot' || path === '/resetpassword' || path === '/verifyemail'

  const token = request.cookies.get('authToken')?.value || ''
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/dashboard', request.nextUrl))
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/dashboard',
    '/signup',
    '/forgot',
    '/resetpassword',
    '/verifyemail'
  ],
}