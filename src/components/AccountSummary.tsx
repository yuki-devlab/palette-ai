import type { Session } from "next-auth";
import prisma from "@/lib/prisma";
import UpgradeButton from "@/components/UpgradeButton";
import UserProfile from "@/components/UserProfile";

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

    const isFreePlan =
        !subscription?.currentPeriodEnd ||
        subscription.currentPeriodEnd <= new Date();

    return (
        <div className="flex gap-2 items-center">
            <UserProfile
                name={user.name}
                image={user.image}
                isFreePlan={isFreePlan}
            />
            {isFreePlan && <UpgradeButton />}
        </div>
    );
}