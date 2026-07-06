import type { Metadata } from "next";

type createMetadataProps = {
    locale: string;
    pathname: string;
    publishedTime?: string;
};

export function createMetadata({ locale, pathname, publishedTime }: createMetadataProps): Metadata {
    const jaPathname = pathname.replace(/^\/(ja|en)(?=$|\/)/, "/ja");
    const enPathname = pathname.replace(/^\/(ja|en)(?=$|\/)/, "/en");

    return {
        alternates: {
            canonical: pathname,
            languages: {
                "ja-JP": jaPathname,
                "en-US": enPathname,
            },
        },
        openGraph: {
            locale: locale === "ja" ? "ja_JP" : "en_US",
            publishedTime: publishedTime,
            url: pathname,
        },
    };
}