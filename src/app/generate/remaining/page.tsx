import { createMetadata } from "@/lib/metadata";
import RemainingClient from "@/app/generate/remaining/_components/RemainingPageClient";

export const metadata = createMetadata({
    title: "決まっている色から残りを自動生成",
    description: "Palette AIの生成ページです。このページでは、すでに決まっている色を入力することで、決まっていない残りの色を自動生成できます。",
    path: "/generate/remaining",
});

export default function RemainingPage() {
    return (
        <RemainingClient />
    );
}