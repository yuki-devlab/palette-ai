import type { Metadata } from "next";
import AutoClient from "@/app/generate/auto/AutoClient";

export const metadata: Metadata = {
    title: "おまかせ自動生成",
}

export default function Autopage() {
    return (
        <AutoClient />
    )
}