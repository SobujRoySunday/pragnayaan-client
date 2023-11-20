import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { PublicPaths } from './constants'
import { getUserRole } from './utils/getUserRole'
import { UserRoles } from '@prisma/client'

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const isPublicPath = PublicPaths.includes(path)
  const token = request.cookies.get('authToken')?.value || ''
  const userRole = await getUserRole(token)

  if (isPublicPath && token) {
    if (userRole === UserRoles.DEV)
      return NextResponse.redirect(new URL('/dashboard/dev', request.nextUrl))
    else if (userRole === UserRoles.ADMIN)
      return NextResponse.redirect(new URL('/dashboard/admin', request.nextUrl))
    else if (userRole === UserRoles.DRIVER)
      return NextResponse.redirect(new URL('/dashboard/driver', request.nextUrl))
    return NextResponse.redirect(new URL('/dashboard/client', request.nextUrl))
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