import { Check } from "@material-symbols-svg/react/w700";
import { cn } from "@/lib/utils";
import SubscribeButton from "@/app/pricing/_components/SubscribeButton";

type PricingCardProps = {
    isProPlan: boolean;
    title: string;
    price: string;
    badge: string;
    features: string[];
    planType: "monthly" | "yearly";
    isPro: boolean;
};

export default function PricingCard({
    isProPlan,
    title,
    price,
    badge,
    features,
    planType,
    isPro,
}: PricingCardProps) {
    return (
        <div className={cn(
            "bg-white flex flex-col gap-8 px-6 py-8 rounded-4xl shadow-sm w-full",
            "xl:w-90",
        )}>
            <div className="flex flex-col gap-6">
                <h2 className="font-bold [text-box:trim-both_cap_alphabetic] text-lg">
                    <span className={cn(
                        isProPlan
                            ? "bg-clip-text bg-linear-to-br from-sky-400 text-transparent to-sky-500"
                            : "text-slate-500",
                    )}>
                        {title}
                    </span>
                </h2>
                <div className="flex gap-2 items-center">
                    <div className="flex gap-1 items-end">
                        <span className="font-bold text-2xl [text-box:trim-both_cap_alphabetic]">
                            ¥
                        </span>
                        <span className="font-bold text-4xl [text-box:trim-both_cap_alphabetic]">
                            {price}
                        </span>
                        <span className="[text-box:trim-both_cap_alphabetic]">
                            / 月
                        </span>
                    </div>
                    <span className="bg-slate-100 p-2 rounded-full [text-box:trim-both_cap_alphabetic] text-slate-500 text-xs">
                        {badge}
                    </span>
                </div>
            </div>
            <ul className="flex flex-col gap-4">
                {features.map((feature) => (
                    <li
                        key={feature}
                        className="flex gap-2 items-center"
                    >
                        <div className="bg-sky-100 flex h-6 items-center justify-center rounded-full w-6">
                            <Check
                                size={16}
                                color="var(--color-sky-500)"
                            />
                        </div>
                        <span className="flex-1 text-slate-500">
                            {feature}
                        </span>
                    </li>
                ))}
            </ul>
            {isProPlan && (
                <SubscribeButton
                    planType={planType}
                    isPro={isPro}
                />
            )}
        </div>
    );
}