import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
export { default } from "next-auth/middleware";
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {

    const token = await getToken({
        req: request,
        salt: '',
        secret: ''
    })
    const url = request.nextUrl

    if (token && (
        url.pathname.startsWith('/sign-in') || 
        url.pathname.startsWith('/sign-up') || 
        url.pathname.startsWith('/')  
    ) ) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    return NextResponse.redirect(new URL('/home', request.url))
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/sign-up',
        '/sign-in',
        '/',
        '/dashboard/:path*',
        '/verify/path:*'
    ]
}