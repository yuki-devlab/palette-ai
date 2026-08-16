import "@/app/globals.css";
import type { Metadata, Viewport } from "next";
import { SessionProvider } from "next-auth/react";
import { inter, notoSansJP } from "@/app/fonts";
import { cn } from "@/lib/utils";
import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import Sidebar from "@/components/layout/sidebar/Sidebar";

type RootLayoutProps = {
    children: React.ReactNode;
};

export const viewport: Viewport = {
    themeColor: "#DFF2FE",
};

export const metadata: Metadata = {
    appleWebApp: {
        title: "Palette AI",
    },
    description: "Palette AIは、ベースカラー・メインカラー・アクセントカラーを自動生成するAIツールです。配色の知識がない方でも、簡単に生成することができます。",
    metadataBase: new URL("https://palette-ai.jp"),
    openGraph: {
        siteName: "Palette AI",
    },
    title: {
        default: "Palette AI | クリエイターのための配色支援ツール",
        template: "%s | Palette AI",
    },
};

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html
            lang="ja"
            className={`${inter.variable} ${notoSansJP.variable}`}
        >
            <body suppressHydrationWarning>
                <SessionProvider>
                    <div className="flex">
                        <Sidebar />
                        <div className="flex-1">
                            <div className="flex flex-col min-h-screen">
                                <div className={cn(
                                    "flex justify-center pt-5 px-5",
                                    "md:pt-8 md:px-0",
                                    "lg:hidden",
                                )}>
                                    <Header />
                                </div>
                                <main className={cn(
                                    "flex flex-1 py-16",
                                    "xl:py-30",
                                )}>
                                    {children}
                                </main>
                            </div>
                            <Footer />
                        </div>
                    </div>
                    <div id="portal" />
                </SessionProvider>
            </body>
        </html>
    );
}