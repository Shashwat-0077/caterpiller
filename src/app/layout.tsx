import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Caterpillar",
    description:
        "A solution for the technicians to ease their work and help then to better organize their work ",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <SessionProvider>{children}</SessionProvider>
            </body>
        </html>
    );
}
