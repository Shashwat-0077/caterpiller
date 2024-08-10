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
    const [isOpen, setIsOpen] = useState(false);
    const path = usePathname();

    return (
        <div>
            <div>
                <h1>Trucky</h1>
                <ul>
                    <li>Link</li>
                    <li>Link</li>
                    <li>Link</li>
                    <li>Link</li>
                    <li className=" ">Link</li>
                </ul>
            </div>
            <div>
                <UserLogo image={session?.user?.image || ""}/>
                <Settings className="transition-all hover" />
            </div>
        </div>
    );
}
