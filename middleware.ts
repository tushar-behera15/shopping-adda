import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  const url = req.nextUrl.clone();

  const otpPage = '/verify-otp';
  const signInPage = '/sign-in';

  // 1️⃣ No token
  if (!token) {
    // Unauthenticated users can only see sign-in page
    if (![signInPage, otpPage].includes(url.pathname)) {
      url.pathname = signInPage;
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  try {
    const { payload } = await jwtVerify(token, secret);
    const { role, is_verified } = payload as { role?: string; is_verified?: boolean };

    // 3️⃣ Verified users: prevent accessing OTP page
    if (is_verified && url.pathname === otpPage) {
      url.pathname = role === 'admin' ? '/admin/dashboard' : '/';
      return NextResponse.redirect(url);
    }

    // 4️⃣ Admin protection
    if (url.pathname.startsWith('/admin') && role !== 'admin') {
      url.pathname = '/';
      return NextResponse.redirect(url);
    }

    // 5️⃣ Admin auto redirect from `/`
    if (url.pathname === '/' && role === 'admin') {
      url.pathname = '/admin/dashboard';
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  } catch (err) {
    console.error('JWT verification failed:', err);
    // Invalid token: redirect admin pages to sign-in
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
