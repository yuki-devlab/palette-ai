import type { Metadata } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
    title: {
        template: "%s | Palette AI",
        default: "Palette AI | 配色自動生成AIツール",
    },
    description: "Webデザインなどで必要な配色を自動生成するAIツールです。配色の知識がない方でも、簡単に生成することができます。",
    metadataBase: new URL("https://palette-ai.com"),
    alternates: {
        canonical: "/",
    },
    openGraph: {
        title: "Palette AI",
        description: "Webデザインなどで必要な配色を自動生成するAIツールです。配色の知識がない方でも、簡単に生成することができます。",
        url: "/",
        siteName: "Palette AI",
        images: "/ogp.png",
        locale: "ja_JP",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
    },
    icons: {
        icon: "/icon.png",
        other: {
            rel: "apple-touch-icon",
            url: "/apple-touch-icon.png",
        }
    }
};

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
})

const notoSansJP = Noto_Sans_JP({
    subsets: ["latin"],
    variable: "--font-noto-sans-jp",
})

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ja" className={`${inter.variable} ${notoSansJP.variable}`}>
            <body>
                <div className="flex min-h-screen">
                    <Sidebar />
                    <main className="w-[calc(100%-320px)] ml-80 flex flex-col items-center justify-center">
                        {children}
                    </main>
                </div>
            </body>
        </html>
    );
}