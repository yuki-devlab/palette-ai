"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import PricingCard from "@/app/pricing/_components/PricingCard";
import ToggleButton from "@/app/pricing/_components/ToggleButton";

type PricingContainerProps = {
    isPro: boolean;
};

export default function PricingContainer({ isPro }: PricingContainerProps) {
    const [planType, setPlanType] = useState<"monthly" | "yearly">("yearly");

    const pricingData = [
        {
            isProPlan: false,
            title: "無料プラン",
            price: "0",
            badge: "ずっと無料",
            features: [
                "すべての機能を使用可能",
                "軽量なAIモデル",
                "生成は1日に10回まで",
                "生成履歴の保存は最新10件まで",
            ],
        },
        {
            isProPlan: true,
            title: "Proプラン",
            price: planType === "yearly" ? "500" : "625",
            badge: planType === "yearly" ? "¥ 6,000 年払い" : "月払い",
            features: [
                "すべての機能を使用可能",
                "高性能なAIモデル",
                "生成は1日に100回まで",
                "生成履歴の保存は無制限",
            ],
        },
    ];

    return (
        <>
            <div className="flex flex-col gap-8 items-center">
                <h1 className="font-bold text-3xl [text-box:trim-both_cap_alphabetic]">
                    料金プラン
                </h1>
                <ToggleButton
                    value={planType}
                    onChange={setPlanType}
                />
            </div>
            <div className={cn(
                "flex flex-col gap-8 items-end w-full",
                "xl:w-auto",
            )}>
                <div className={cn(
                    "flex flex-col gap-5 w-full",
                    "md:flex-row md:gap-6",
                    "xl:w-auto",
                )}>
                    {pricingData.map((pricingInfo) => (
                        <PricingCard
                            key={pricingInfo.title}
                            planType={planType}
                            isPro={isPro}
                            {...pricingInfo}
                        />
                    ))}
                </div>
                <Link
                    href="/commercial-transactions"
                    className={cn(
                        "[text-box:trim-both_cap_alphabetic] text-slate-500 text-sm transition-colors",
                        "hover:text-slate-800",
                    )}
                >
                    特定商取引法に基づく表記
                </Link>
            </div>
        </>
    );
}