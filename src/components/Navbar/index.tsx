"use client";
import { LoaderCircle, Menu, Settings, UserRound, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import UserLogo from "./UserLogo";

export default function Navbar() {
    const { data: session, status } = useSession();
    return (
        <div className="flex min-h-screen flex-shrink-0 basis-80 flex-col justify-between px-7 py-6">
            <div>
                <h1 className="text-3xl font-semibold">Trucky</h1>
                <ul className="space-y-2 pl-4 pt-5">
                    <li className="hover:underline">Link</li>
                    <li className="hover:underline">Link</li>
                    <li className="hover:underline">Link</li>
                    <li className="hover:underline">Link</li>
                    <li className="hover:underline">Link</li>
                </ul>
            </div>
            <div className="flex items-center justify-between">
                <UserLogo image={session?.user?.image || ""} />
                <Settings className="transition-all hover:rotate-90" />
            </div>
        </div>
    );
}
