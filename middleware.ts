import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function middleware(req: NextRequest) {
    const token = req.cookies.get('token')?.value;
    const url = req.nextUrl.clone();

    // Pages that should not be accessible after verification
    const otpPage = '/verify-otp';
    const signInPage = '/sign-in';

    // If no token, redirect admin pages to sign-in
    if (!token) {
        if (url.pathname.startsWith('/admin')) {
            url.pathname = signInPage;
            return NextResponse.redirect(url);
        }
        return NextResponse.next();
    }

    try {
        const { payload } = await jwtVerify(token, secret);
        const { role, is_verified } = payload;

        // Redirect to OTP if not verified
        if (!is_verified && url.pathname !== otpPage) {
            url.pathname = otpPage;
            return NextResponse.redirect(url);
        }

        // If user is already verified and tries to access OTP page, redirect to home/admin
        if (is_verified && url.pathname === otpPage) {
            url.pathname = role === 'admin' ? '/admin/dashboard' : '/';
            return NextResponse.redirect(url);
        }

        // Admin page access
        if (url.pathname.startsWith('/admin') && role !== 'admin') {
            url.pathname = '/';
            return NextResponse.redirect(url);
        }

        // Home page redirects for admin
        if (url.pathname === '/' && role === 'admin') {
            url.pathname = '/admin/dashboard';
            return NextResponse.redirect(url);
        }

        return NextResponse.next();
    } catch (err) {
        console.error('JWT verification failed:', err);
        if (url.pathname.startsWith('/admin')) {
            url.pathname = signInPage;
            return NextResponse.redirect(url);
        }
        return NextResponse.next();
    }
}

export const config = {
    matcher: ['/admin/:path*'],
};
