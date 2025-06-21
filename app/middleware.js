// middleware.js
import { NextResponse } from 'next/server'

export function middleware(request) {
  const token = request.cookies.get('token')?.value
  const pathname = request.nextUrl.pathname

  // Rute yang membutuhkan autentikasi
  const isProtected =
    pathname.startsWith('/admin') ||
    pathname.startsWith('/kemahasiswaan') ||
    pathname.startsWith('/mahasiswa')

  // Redirect ke /login jika tidak punya token
  if (!token && isProtected) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Role: ADMIN
  if (token === 'admin') {
    if (pathname.startsWith('/kemahasiswaan') || pathname.startsWith('/mahasiswa')) {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
  }

  // Role: KEMAHASISWAAN
  if (token === 'kemahasiswaan') {
    if (pathname.startsWith('/admin') || pathname.startsWith('/mahasiswa')) {
      return NextResponse.redirect(new URL('/kemahasiswaan', request.url))
    }
  }

  // Role: MAHASISWA
  if (token === 'mahasiswa') {
    if (pathname.startsWith('/admin') || pathname.startsWith('/kemahasiswaan')) {
      return NextResponse.redirect(new URL('/mahasiswa', request.url))
    }
  }

  return NextResponse.next()
}

// Tentukan rute yang akan dicegat oleh middleware
export const config = {
  matcher: ['/admin/:path*', '/kemahasiswaan/:path*', '/mahasiswa/:path*'],
}
