import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import ResultClient from "@/components/result/ResultClient";

type GenerateMetadataProps = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ searchParams }: GenerateMetadataProps): Promise<Metadata> {
    const { id } = await searchParams;

    const idString = typeof id === "string" ? id: "";

    const dynamicMetadata = createMetadata({
        pathname: `/generate/result${idString ? `?id=${idString}` : ""}`,
    });

    return {
        ...dynamicMetadata,
        description: "Palette AIの生成結果ページです。生成された配色はこちらになります。",
        robots: { index: false },
        title: "生成結果",
    }
}

export default function ResultPage() {
    return (
        <ResultClient />
    );
}