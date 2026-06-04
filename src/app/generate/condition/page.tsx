import type { Metadata } from "next";
import ConditionClient from "@/app/generate/condition/ConditionClient";

export const metadata: Metadata = {
    title: "指定した条件から自動生成",
}

export default function ConditionPage() {
    return (
        <ConditionClient />
    )
}