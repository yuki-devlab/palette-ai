import type { Metadata } from "next";
import SiteClient from "@/app/generate/site/SiteClient";

export const metadata: Metadata = {
    title: "サイトから配色を抽出",
}

export default function SitePage() {
    return (
        <SiteClient />
    )
}