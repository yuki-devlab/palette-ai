import { Suspense } from "react";
import ResultClient from "@/components/result/ResultClient";

export default function ResultPage() {
    return (
        <Suspense>
            <ResultClient />
        </Suspense>
    );
}