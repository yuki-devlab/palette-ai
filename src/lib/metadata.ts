import type { Metadata } from "next";

type CreateMetadataProps = {
    locale: string;
    pathname: string;
    ogType?: "website" | "article";
    publishedTime?: string;
};

export function createMetadata({
    locale,
    pathname,
    ogType = "website",
    publishedTime,
}: CreateMetadataProps): Metadata {
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
            ...(ogType === "article" &&
                publishedTime && {
                    publishedTime: publishedTime,
                }),
            siteName: "Palette AI",
            type: ogType,
            url: pathname,
        },
    };
}