"use client";

import { Settings } from "lucide-react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import UserLogo from "./UserLogo";
import Link from "next/link";

export default function Navbar() {
    const { data: session } = useSession();
    const path = usePathname();

    // BUG : Navbar is not sticky

    return (
        <nav className="sticky left-0 top-0 flex h-screen shrink-0 basis-80 flex-col justify-between bg-gray-100 px-7 py-7">
            <section>
                <h1 className="text-2xl font-semibold">Trucky</h1>
                <ul className="pt-2">
                    <Link
                        href={"#tires"}
                        className={`block rounded-md py-2 pl-4 transition-all hover:cursor-pointer hover:bg-gray-200 hover:underline ${path === "/dashboard" ? "bg-yellow-100" : ""}`}
                    >
                        Tires
                    </Link>
                    <Link
                        href={"#battery"}
                        className={`block rounded-md py-2 pl-4 transition-all hover:cursor-pointer hover:bg-gray-200 hover:underline ${path === "" ? "bg-yellow-100" : ""}`}
                    >
                        Battery
                    </Link>
                    <Link
                        href={"#exterior"}
                        className={`block rounded-md py-2 pl-4 transition-all hover:cursor-pointer hover:bg-gray-200 hover:underline ${path === "" ? "bg-yellow-100" : ""}`}
                    >
                        Exterior
                    </Link>
                    <Link
                        href={"#brakes"}
                        className={`block rounded-md py-2 pl-4 transition-all hover:cursor-pointer hover:bg-gray-200 hover:underline ${path === "" ? "bg-yellow-100" : ""}`}
                    >
                        Brakes
                    </Link>
                    <Link
                        href={"#engine"}
                        className={`block rounded-md py-2 pl-4 transition-all hover:cursor-pointer hover:bg-gray-200 hover:underline ${path === "" ? "bg-yellow-100" : ""}`}
                    >
                        Engine
                    </Link>
                </ul>
            </section>
            <section className="flex items-center justify-between">
                {/* TODO : add loading state for user image   */}
                <UserLogo image={session?.user?.image || ""} />
                <Settings className="transition-all hover:rotate-90" />
            </section>
        </nav>
    );
}
