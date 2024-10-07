import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { getSession } from '@/app/api/session/route'
import type { Locale } from '@/configs/i18n'
import { i18n } from '@/configs/i18n'
import type { IUserRole } from '@/utils/interfaces'

type RoutePermissions = Record<string, IUserRole[]>

const protectedRoutes: RoutePermissions = {
  '/dashboard': [
    'admin',
    'akkreditatsiya',
    'auditor',
    'byuro',
    'korxona rahbari',
    'labaratoriya boshliq',
    'labaratoriya mutahasis',
    'menejer',
    'uzstandart'
  ]
}

const publicRoutes: string[] = ['/login', '/signup', '/']

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  const normalizedPath = path.replace(/^\/[a-z]{2}(?=\/)/, '')

  const session = await getSession()
  const { isLoggedIn, user, locale: sessionLocale } = session
  const userRole = user?.role as IUserRole | undefined
  const locale = sessionLocale || (i18n.defaultLocale as Locale)

  const isAuthenticated: boolean = isLoggedIn && !!user
  const isProtectedRoute: boolean = Object.keys(protectedRoutes).includes(normalizedPath)
  const isPublicRoute: boolean = publicRoutes.includes(normalizedPath)

  if (isProtectedRoute) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/login', req.nextUrl))
    }

    const allowedRoles: IUserRole[] = protectedRoutes[normalizedPath]

    if (!allowedRoles.includes(userRole!)) {
      return NextResponse.redirect(new URL('/login', req.nextUrl))
    }
  }

  if (isPublicRoute && isAuthenticated) {
    const roleBasedRedirect: Record<IUserRole, string> = {
      admin: '/dashboard',
      'korxona rahbari': '/dashboard',
      'labaratoriya boshliq': '/dashboard',
      'labaratoriya mutahasis': '/applications',
      akkreditatsiya: '/dashboard',
      auditor: '/dashboard',
      byuro: '/dashboard',
      menejer: '/dashboard',
      uzstandart: '/dashboard'
    }

    const defaultRedirect: string = roleBasedRedirect[userRole!] || '/dashboard'

    if (path === '/') {
      return NextResponse.redirect(new URL(`/${locale}/${defaultRedirect}`, req.nextUrl))
    }

    if (!req.nextUrl.pathname.startsWith(defaultRedirect)) {
      return NextResponse.redirect(new URL(`/${locale}/${defaultRedirect}`, req.nextUrl))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)']
}
