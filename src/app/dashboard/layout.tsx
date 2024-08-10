import Navbar from "@/components/Navbar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="grid grid-cols-[300px_1fr]">
            <Navbar />
            <div className="px-10 py-4">{children}</div>
        </div>
    );
}
