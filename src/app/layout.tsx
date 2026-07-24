import "@/app/globals.css";
import { inter, notoSansJP } from "@/app/fonts";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Sidebar from "@/components/sidebar/Sidebar";

export default function RootLayout(children: React.ReactNode) {
    return (
        <html
            lang="ja"
            className={`${inter.variable} ${notoSansJP.variable}`}
        >
            <body>
                <div className="flex">
                    <Sidebar />
                    <div className="flex-1">
                        <div className="flex flex-col h-screen">
                            <Header />
                            <main className="flex-1">
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