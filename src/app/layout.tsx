import "@/app/globals.css";
import { SessionProvider } from "next-auth/react";
import { inter, notoSansJP } from "@/app/fonts";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Sidebar from "@/components/sidebar/Sidebar";

type RootLayoutProps = {
    children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html
            lang="ja"
            className={`${inter.variable} ${notoSansJP.variable}`}
        >
            <body>
                <SessionProvider>
                    <div className="flex">
                        <Sidebar />
                        <div className="flex min-w-0 flex-1 flex-col">
                            <Header />
                            <main className="flex flex-1 flex-col min-h-screen">
                                {children}
                            </main>
                            <Footer />
                        </div>
                    </div>
                    <div id="portal" />
                </SessionProvider>
            </body>
        </html>
    );
}