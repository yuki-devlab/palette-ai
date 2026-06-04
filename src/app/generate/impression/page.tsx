import type { Metadata } from "next";
import ImpressionClient from "@/app/generate/impression/ImpressionClient";

export const metadata: Metadata = {
    title: "与えたい印象から自動生成",
}

export default function ImpressionPage() {
    return (
        <ImpressionClient />
    )
}