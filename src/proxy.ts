import { getSessionCookie } from "better-auth/cookies";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
    const sessionCookie = getSessionCookie(request);

    if (!sessionCookie) {
        const signInUrl = new URL("/sign-in", request.url);
        signInUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
        return NextResponse.redirect(signInUrl);
    }

    return NextResponse.next();
}

export const middleware = proxy;

export const config = {
    matcher: ["/product/:path*", "/profile/:path*"],
};