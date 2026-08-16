import { Suspense } from "react";
import { createMetadata } from "@/lib/metadata";
import ResultClient from "@/components/result/ResultClient";

export const metadata = createMetadata({
    title: "生成結果",
    description: "Palette AIの生成結果ページです。自動生成された結果がここに表示されます。",
    path: "/generate/result",
});

export default function ResultPage() {
    return (
        <Suspense>
            <ResultClient />
        </Suspense>
    );
}