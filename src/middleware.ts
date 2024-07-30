import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
export { default } from "next-auth/middleware";
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {

    const token = await getToken({
        req: request
    })
    const url = request.nextUrl

    if (url.pathname === '/') {
        return NextResponse.next();
    }

    if (token && (
        url.pathname.startsWith('/sign-in') ||  
        url.pathname.startsWith('/sign-up') 
    )) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/verify-code'
    ]
}