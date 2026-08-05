import "@/app/globals.css";
import type { Metadata, Viewport } from "next";
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
};

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html
            lang="ja"
            className={`${inter.variable} ${notoSansJP.variable}`}
        >
            <body>
                <div className="flex">
                    <Sidebar />
                    <div className={cn(
                        "flex-1 px-5",
                        "md:px-8",
                    )}>
                        <div className={cn(
                            "flex flex-col items-center min-h-screen pt-4",
                            "md:pt-8",
                            "lg:pt-0",
                        )}>
                            <Header />
                            <main className="flex flex-1 w-full">
                                {children}
                            </main>
                        </div>
                        <Footer />
                    </div>
                </div>
                <div id="portal" />
            </body>
        </html>
    );
}