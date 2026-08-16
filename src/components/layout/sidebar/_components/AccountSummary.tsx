import type { Session } from "next-auth";
import AccountSettingsButton from "@/components/layout/sidebar/_components/AccountSettingsButton";
import CustomerPortalButton from "@/components/ui/CustomerPortalButton";
import UpgradeButton from "@/components/ui/UpgradeButton";

type AccountSummaryProps = {
    user: Session["user"];
    isPro: boolean;
};

export default function AccountSummary({ user, isPro }: AccountSummaryProps) {
    return (
        <div className="flex items-center justify-between">
            <AccountSettingsButton
                user={user}
                isPro={isPro}
            />
            {isPro ? (
                <CustomerPortalButton />
            ) : (
                <UpgradeButton isPro={isPro} />
            )}
        </div>
    );
}