"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import CommercialTransactionsContent from "@/app/terms/_components/CommercialTransactionsContent";
import PrivacyContent from "@/app/terms/_components/PrivacyContent";
import TermsContent from "@/app/terms/_components/TermsContent";
import ToggleButton from "@/app/terms/_components/ToggleButton";

type TabType = "terms" | "privacy" | "commercial-transactions";

const TAB_TITLES: Record<TabType, string> = {
    terms: "利用規約",
    privacy: "プライバシーポリシー",
    "commercial-transactions": "特商法表記",
};

export default function TermsContainer() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const tabParam = searchParams.get("tab");
    const activeTab: TabType =
        tabParam === "privacy" || tabParam === "commercial-transactions"
            ? tabParam
            : "terms";

    const handleTabChange = (newTab: TabType) => {
        const params = new URLSearchParams(searchParams.toString());

        if (newTab === "terms") {
            params.delete("tab");
        } else {
            params.set("tab", newTab);
        }

        router.push(`/terms${params.toString() ? `?${params.toString()}` : ""}`);
    };

    return (
        <>
            <div className="flex flex-col gap-8 items-center">
                <h1 className="font-semibold text-3xl [text-box:trim-both_cap_alphabetic]">
                    {TAB_TITLES[activeTab]}
                </h1>
                <ToggleButton
                    value={activeTab}
                    onChange={handleTabChange}
                />
            </div>
            <div className={cn(
                "flex flex-col w-full rounded-4xl bg-white shadow-sm px-6 py-8 gap-6 leading-relaxed",
                "xl:w-3xl md:p-8 md:py-10",
            )}>
                {activeTab === "terms" && <TermsContent />}
                {activeTab === "privacy" && <PrivacyContent />}
                {activeTab === "commercial-transactions" && <CommercialTransactionsContent />}
            </div>
        </>
    );
}