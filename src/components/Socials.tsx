"use client";
import { FaGoogle, FaApple } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { DEFAULT_REDIRECT } from "@/routes";

export default function Socials() {
    const onSignIngClick = (provider: "google" | "apple") => {
        signIn(provider, {
            callbackUrl: DEFAULT_REDIRECT,
        });
    };

    return (
        <div className="flex flex-col gap-4">
            <div
                className="flex select-none items-center gap-2 rounded-md bg-[#4285F4] px-6 py-2 text-center text-white hover:bg-[#3367D6]"
                onClick={() => onSignIngClick("google")}
            >
                <FaGoogle className="h-5 w-5" />
                Sign in with Google
            </div>
            <div
                className="flex select-none items-center gap-2 rounded-md bg-[#000] px-6 py-2 text-center text-white hover:bg-[#333]"
                onClick={() => onSignIngClick("apple")}
            >
                <FaApple className="h-5 w-5" />
                Sign in with Apple
            </div>
        </div>
    );
}
