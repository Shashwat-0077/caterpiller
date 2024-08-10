import NextAuth from "next-auth";
import authConfig from "./auth.config";
import {
    apiAuthPrefix,
    authRoutes,
    DEFAULT_REDIRECT,
    publicRoutes,
} from "./routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
    const { nextUrl } = req;

    const isLoggedIn = !!req.auth;
    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    if (isApiAuthRoute) return;

    if (isAuthRoute) {
        // TODO : Apply callback urls and redirects
        if (isLoggedIn)
            return Response.redirect(new URL(DEFAULT_REDIRECT, nextUrl));
        return;
    }

    if (!isLoggedIn && !isPublicRoute) {
        const UrlWithCallBack = new URL("/auth/login", nextUrl);
        UrlWithCallBack.searchParams.append("callbackUrl", nextUrl.pathname);
        return Response.redirect(UrlWithCallBack);
    }

    return;
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        // Always run for API routes
        "/(api|trpc)(.*)",
    ],
};
