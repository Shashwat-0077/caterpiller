"use client";
import { LoaderCircle, Menu, UserRound, X } from "lucide-react";
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
        <div className="sticky top-0 z-50 bg-[black] bg-opacity-80 p-1 backdrop-blur-md">
            <div className="mx-auto flex max-w-screen-xl items-center justify-between">
                <Link href="/">
                    <Image
                        className="h-[80px] w-[246px] object-cover"
                        priority
                        src={"/Logo.png"}
                        alt="Logo"
                        width={246}
                        height={80}
                    />
                </Link>

                <ul className="hidden items-center gap-10 md:flex">
                    <li>
                        <Link
                            href="/"
                            className={`${
                                path === "/"
                                    ? "text-primary-start"
                                    : "text-para opacity-80"
                            } hover:text-primary-start hover:opacity-100`}
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/about"
                            className={`${
                                path === "/about"
                                    ? "text-primary-start"
                                    : "text-para opacity-80"
                            } hover:text-primary-start hover:opacity-100`}
                        >
                            About
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/features"
                            className={`${
                                path === "/features"
                                    ? "text-primary-start"
                                    : "text-para opacity-80"
                            } hover:text-primary-start hover:opacity-100`}
                        >
                            Features
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/howItWorks"
                            className={`${
                                path === "/howItWorks"
                                    ? "text-primary-start"
                                    : "text-para opacity-80"
                            } hover:text-primary-start hover:opacity-100`}
                        >
                            How it works
                        </Link>
                    </li>
                </ul>

                {status === "loading" ? (
                    <LoaderCircle className="animate-spin text-white" />
                ) : status === "authenticated" ? (
                    <UserLogo
                        image={session.user?.image || ""}
                        username={session.user?.name}
                    />
                ) : (
                    <Link
                        href={"/login"}
                        className={`hidden items-center gap-2 rounded-full bg-gradient-to-r from-primary-start to-primary-end px-7 py-4 text-lg font-semibold text-white transition hover:-rotate-3 md:flex`}
                    >
                        <UserRound />
                        Login
                    </Link>
                )}

                {/* Mobile Screen */}
                <div className="relative md:hidden">
                    {isOpen ? (
                        <X
                            onClick={() => setIsOpen(false)}
                            className="size-7 cursor-pointer text-primary-end"
                        />
                    ) : (
                        <Menu
                            onClick={() => setIsOpen(true)}
                            className="size-7 cursor-pointer text-primary-end"
                        />
                    )}

                    {isOpen && (
                        <div className="absolute right-2 top-8 min-w-[220px] rounded-2xl border bg-white p-4 shadow-lg">
                            <ul className="mb-8 flex flex-col items-center gap-6">
                                <li>
                                    <Link
                                        href="/"
                                        className={`${
                                            path === "/"
                                                ? "text-primary-start"
                                                : "text-para opacity-80"
                                        } hover:text-primary-start hover:opacity-100`}
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/about"
                                        className={`${
                                            path === "/about"
                                                ? "text-primary-start"
                                                : "text-para opacity-80"
                                        } hover:text-primary-start hover:opacity-100`}
                                    >
                                        About
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/features"
                                        className={`${
                                            path === "/features"
                                                ? "text-primary-start"
                                                : "text-para opacity-80"
                                        } hover:text-primary-start hover:opacity-100`}
                                    >
                                        Features
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/howItWorks"
                                        className={`${
                                            path === "/howItWorks"
                                                ? "text-primary-start"
                                                : "text-para opacity-80"
                                        } hover:text-primary-start hover:opacity-100`}
                                    >
                                        How it works
                                    </Link>
                                </li>
                            </ul>

                            <Link
                                href={"/login"}
                                className={`flex w-full items-center gap-2 rounded-full bg-gradient-to-r from-primary-start to-primary-end px-7 py-4 text-lg font-semibold text-white transition hover:-rotate-3`}
                            >
                                <UserRound />
                                Login
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
