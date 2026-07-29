import type { Metadata } from "next";

type createMetadataProps = {
    title?: string;
    description?: string;
    path: string;
    ogType?: "website" | "article";
    publishedTime?: string;
    noIndex?: boolean;
    noFollow?: boolean;
};

export function createMetadata({
    title,
    description,
    path,
    ogType = "website",
    publishedTime,
    noIndex,
    noFollow,
}: createMetadataProps): Metadata {
    const hasRobots = noIndex !== undefined || noFollow !== undefined;

    return {
        ...(title && { title }),
        ...(description && { description }),
        alternates: {
            canonical: path,
        },
        openGraph: {
            url: path,
            type: ogType,
            ...(publishedTime && { publishedTime }),
        },
        ...(hasRobots && {
            robots: {
                ...(noIndex !== undefined && { index: !noIndex }),
                ...(noFollow !== undefined && { follow: !noFollow }),
            },
        }),
    };
}