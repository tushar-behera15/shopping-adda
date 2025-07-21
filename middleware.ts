import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function middleware(req: NextRequest) {
    const token = req.cookies.get('token')?.value;
    const url = req.nextUrl.clone();

    if (!token) {
        if (url.pathname.startsWith('/admin')) {
            url.pathname = '/sign-in';
            return NextResponse.redirect(url);
        }
        return NextResponse.next(); 
    }

    try {
        const { payload } = await jwtVerify(token, secret);
        const { role } = payload;

        if (url.pathname === '/') {
            if (role === 'admin') {
                url.pathname = '/admin/dashboard';
                return NextResponse.redirect(url);
            }
        }

        if (url.pathname.startsWith('/admin')) {
            if (role !== 'admin') {
                url.pathname = '/';
                return NextResponse.redirect(url);
            }
        }

        return NextResponse.next();
    } catch (err) {
        console.error('JWT verification failed:', err);
        if (url.pathname.startsWith('/admin')) {
            url.pathname = '/sign-in';
            return NextResponse.redirect(url);
        }
        return NextResponse.next();
    }
}
export const config = {
    matcher: ['/admin/:path*'],
};
