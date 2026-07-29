import type { Session } from "next-auth";
import prisma from "@/lib/prisma";
import { cn } from "@/lib/utils";
import AccountInfo from "@/components/layout/sidebar/_components/AccountInfo";
import UpgradeButton from "@/components/layout/sidebar/_components/UpgradeButton";

type AccountSummaryProps = {
    user: Session["user"];
};

export default async function AccountSummary({ user }: AccountSummaryProps) {
    const subscription = await prisma.subscription.findUnique({
        where: {
            userId: user.id,
        },
        select: {
            currentPeriodEnd: true,
        },
    });

    const isPro =
        !!subscription?.currentPeriodEnd &&
        subscription.currentPeriodEnd > new Date();

    return (
        <div className={cn(
            "flex gap-2 items-center",
            "xl:gap-3",
        )}>
            <AccountInfo
                user={user}
                isPro={isPro}
            />
            <UpgradeButton />
        </div>
    );
}