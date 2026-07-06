import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import { ThemeProvider } from "next-themes";
import "@/app/globals.css";
import { inter, notoSansJP } from "@/app/fonts";
import { routing } from "@/i18n/routing";
import Sidebar from "@/components/sidebar/Sidebar";

type GenerateMetadataProps = {
    params: Promise<{locale: string}>;
};

type RootLayoutProps = {
    children: React.ReactNode;
    params: Promise<{locale: string}>;
};

export async function generateMetadata({ params }: GenerateMetadataProps): Promise<Metadata> {
    const { locale } = await params;

    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    const t = await getTranslations({ locale, namespace: "metadata" });

    return {
        appleWebApp: {
            title: "Palette AI",
        },
        description: t("description.top"),
        formatDetection: {
            address: false,
            email: false,
            telephone: false,
        },
        metadataBase: new URL("https://palette-ai.app"),
        openGraph: {
            siteName: "Palette AI",
            type: "website",
        },
        title: {
            default: t("title.top"),
            template: "%s | Palette AI",
        },
        twitter: {
            card: "summary_large_image",
        },
        verification: {
            google: "uh21-6wm2Uo5Uh6Uy_4JvJetk2iPgBJMPnBRuRoa69A",
        },
    };
}

export default async function RootLayout({ children, params }: RootLayoutProps) {
    const { locale } = await params;

    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    return (
        <html
            lang={locale}
            className={`${inter.variable} ${notoSansJP.variable}`}
            suppressHydrationWarning
        >
            <body>
                <NextIntlClientProvider>
                    <ThemeProvider attribute="class">
                        <div className="flex">
                            <Sidebar />
                            <main className="flex-1">
                                {children}
                            </main>
                        </div>
                        <div id="portal" />
                    </ThemeProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}