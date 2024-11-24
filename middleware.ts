// middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  const { data: { session } } = await supabase.auth.getSession()

  // Paths that don't require authentication
  const publicPaths = ['/', '/login', '/signup']
  const isPublicPath = publicPaths.includes(req.nextUrl.pathname)

  // Get user type from session if it exists
  let userType = null
  if (session?.user) {
    const { data } = await supabase
      .from('profiles')
      .select('user_type')
      .eq('id', session.user.id)
      .single()
    userType = data?.user_type
  }

  // Check if trying to access player routes
  if (req.nextUrl.pathname.startsWith('/player') && userType !== 'player') {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  // Check if trying to access coach routes
  if (req.nextUrl.pathname.startsWith('/coach') && userType !== 'coach') {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  // Redirect authenticated users away from auth pages
  if (session && isPublicPath) {
    if (userType === 'player') {
      return NextResponse.redirect(new URL('/player/dashboard', req.url))
    } else if (userType === 'coach') {
      return NextResponse.redirect(new URL('/coach/dashboard', req.url))
    }
  }

  // Redirect unauthenticated users to login
  if (!session && !isPublicPath) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return res
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}