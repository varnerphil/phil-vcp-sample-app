import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  // Only handle the root path
  if (request.nextUrl.pathname === '/') {
    // Check for stored language preference
    const language = request.cookies.get('preferred_language')?.value || 'en'
    
    // Redirect to the appropriate language path
    return NextResponse.redirect(new URL(`/${language}/home`, request.url))
  }
}
 
export const config = {
  matcher: '/',
}
