import { createMetadata } from "@/lib/metadata";
import ConditionClient from "@/app/generate/condition/_components/ConditionPageClient";

export const metadata = createMetadata({
    title: "指定した条件から自動生成",
    description: "Palette AIの生成ページです。このページでは、指定したい条件を入力することで、おすすめの配色を自動生成できます。",
    path: "/generate/condition",
});

export default function ConditionPage() {
    return (
        <ConditionClient />
    );
}