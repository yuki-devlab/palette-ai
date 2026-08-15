import { Check } from "@material-symbols-svg/react/w700";
import { cn } from "@/lib/utils";
import SubscribeButton from "@/components/ui/modal/upgrade/_components/SubscribeButton";

type PricingCardProps = {
    isYearly: boolean;
    isPro: boolean;
};

export default function PricingCard({ isYearly, isPro }: PricingCardProps) {
    return (
        <div className={cn(
            "flex flex-col w-full gap-6 px-5 py-6 rounded-4xl bg-white",
            "md:gap-8 md:px-6 md:py-8",
        )}>
            <div className={cn(
                "flex flex-col gap-5",
                "md:gap-6",
            )}>
                <h2 className="font-semibold [text-box:trim-both_cap_alphabetic] text-lg">
                    <span className="bg-clip-text bg-linear-to-br from-sky-400 text-transparent to-sky-500">
                        Proプラン
                    </span>
                </h2>
                <div className="flex gap-2 items-center">
                    <div className="flex gap-1 items-end">
                        <span className="font-semibold text-2xl [text-box:trim-both_cap_alphabetic]">
                            ¥
                        </span>
                        <span className="font-semibold text-4xl [text-box:trim-both_cap_alphabetic]">
                            {isYearly ? "500" : "625"}
                        </span>
                        <span className="[text-box:trim-both_cap_alphabetic]">
                            / 月
                        </span>
                    </div>
                    <span className="bg-slate-100 p-2 rounded-full [text-box:trim-both_cap_alphabetic] text-slate-500 text-xs">
                        {isYearly ? "¥ 6,000 年払い" : "月払い"}
                    </span>
                </div>
            </div>
            <ul className="flex flex-col gap-4">
                <li
                    className="flex gap-2 items-center"
                >
                    <div className="bg-sky-100 flex h-6 items-center justify-center rounded-full w-6">
                        <Check
                            size={16}
                            color="var(--color-sky-500)"
                        />
                    </div>
                    <span className="flex-1 text-slate-500">
                        すべての機能を使用可能
                    </span>
                </li>
                <li
                    className="flex gap-2 items-center"
                >
                    <div className="bg-sky-100 flex h-6 items-center justify-center rounded-full w-6">
                        <Check
                            size={16}
                            color="var(--color-sky-500)"
                        />
                    </div>
                    <span className="flex-1 text-slate-500">
                        高性能なAIモデル
                    </span>
                </li>
                <li
                    className="flex gap-2 items-center"
                >
                    <div className="bg-sky-100 flex h-6 items-center justify-center rounded-full w-6">
                        <Check
                            size={16}
                            color="var(--color-sky-500)"
                        />
                    </div>
                    <span className="flex-1 text-slate-500">
                        生成は1日に100回まで
                    </span>
                </li>
                <li
                    className="flex gap-2 items-center"
                >
                    <div className="bg-sky-100 flex h-6 items-center justify-center rounded-full w-6">
                        <Check
                            size={16}
                            color="var(--color-sky-500)"
                        />
                    </div>
                    <span className="flex-1 text-slate-500">
                        生成履歴の保存は無制限
                    </span>
                </li>
            </ul>
            <SubscribeButton
                planType={isYearly ? "yearly" : "monthly"}
                isPro={isPro}
            />
        </div>
    )
}