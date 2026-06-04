import type { Metadata } from "next";
import ImageClient from "@/app/generate/image/ImageClient";

export const metadata: Metadata = {
    title: "画像から配色を抽出",
}

export default function ImagePage() {
    return (
        <ImageClient />
    )
}