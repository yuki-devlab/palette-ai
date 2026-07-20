import TermsClient from "@/components/terms/TermsClient";
import { Suspense } from "react";

export default function TermsPage() {
    return (
        <Suspense>
            <TermsClient />
        </Suspense>
    );
}