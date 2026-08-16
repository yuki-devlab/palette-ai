import { createMetadata } from "@/lib/metadata";
import { getSubscriptionStatus } from "@/lib/subscription-status";
import { cn } from "@/lib/utils";
import PricingContainer from "@/app/pricing/_components/PricingContainer";

export const metadata = createMetadata({
    title: "料金プラン",
    description: "Palette AIの料金プランページです。Proプランにアップグレードすることで、特定の制限を解除することができます。",
    path: "/pricing",
});

export default async function PricingPage() {
    const { isPro } = await getSubscriptionStatus();

    return (
        <div className={cn(
            "flex flex-col gap-10 items-center justify-center px-5 w-full",
            "md:px-8",
            "xl:px-0",
        )}>
            <PricingContainer isPro={isPro} />
        </div>
    );
}