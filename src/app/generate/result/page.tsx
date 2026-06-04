import { Suspense } from "react";
import type { Metadata } from "next";
import ResultClient from "@/app/generate/result/ResultClient";

export const metadata: Metadata = {
    title: "生成結果",
}

export default function ResultPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ResultClient />
        </Suspense>
    )
}