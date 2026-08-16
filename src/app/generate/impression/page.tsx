import { createMetadata } from "@/lib/metadata";
import ImpressionClient from "@/app/generate/impression/_components/ImpressionPageClient";

export const metadata = createMetadata({
    title: "与えたい印象から自動生成",
    description: "Palette AIの生成ページです。このページでは、ユーザーに与えたい印象を選択することで、おすすめの配色を自動生成できます。",
    path: "/generate/impression",
});

export default function ImpressionPage() {
    return (
        <ImpressionClient />
    );
}