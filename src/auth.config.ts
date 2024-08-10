import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
// import Apple from "next-auth/providers/apple";

export default {
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        // Apple,
    ],
} satisfies NextAuthConfig;
