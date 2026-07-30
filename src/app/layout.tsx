import type { Metadata, Viewport } from "next";
import { SessionProvider } from "next-auth/react";
import "@/app/globals.css";
import { inter, notoSansJP } from "@/app/fonts";
import { cn } from "@/lib/utils";
import Footer from "@/components/layout/Footer";
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
    verification: {
        google: "pcO7KAV3YtM4v2Nr0fXYE6Zx9RIGMtkQAR27MVFEH0w",
    },
};

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html
            lang="ja"
            className={`${inter.variable} ${notoSansJP.variable}`}
        >
            <body>
                <SessionProvider>
                    <div className="lg:flex">
                        <Sidebar />
                        <div className={cn(
                            "px-5",
                            "md:px-6",
                            "lg:flex-1 lg:px-10",
                            "xl:px-0",
                        )}>
                            <div className={cn(
                                "flex flex-col min-h-screen pt-5",
                                "md:pt-6",
                                "lg:pt-0",
                            )}>
                                <Header />
                                <main className="flex flex-1 items-center justify-center">
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