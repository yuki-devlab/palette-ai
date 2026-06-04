import type { Metadata } from "next";
import RemainingClient from "@/app/generate/remaining/RemainingClient";

export const metadata: Metadata = {
    title: "決まっている色から残りを自動生成",
}

export default function RemainingPage() {
    return (
        <RemainingClient />
    )
}