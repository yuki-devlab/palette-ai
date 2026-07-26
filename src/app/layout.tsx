import "@/app/globals.css";
import { inter, notoSansJP } from "@/app/fonts";
import { cn } from "@/lib/utils";
import Footer from "@/components/layout/Footer";
import Header from "@/components/Header";
import Sidebar from "@/components/layout/Sidebar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="ja"
            className={`${inter.variable} ${notoSansJP.variable}`}
        >
            <body>
                <div className="lg:flex">
                    <Sidebar />
                    <div className={cn(
                        "px-5",
                        "md:px-6",
                        "lg:flex-1 lg:px-10",
                        "xl:px-0",
                    )}>
                        <div className={cn(
                            "flex flex-col h-screen pt-5",
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
            </body>
        </html>
    );
}