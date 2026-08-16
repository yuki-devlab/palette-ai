import Link from "next/link";
import { auth } from "@/lib/auth";
import { getSubscriptionStatus } from "@/lib/subscription-status";
import { cn } from "@/lib/utils";
import { getSidebarHistory } from "@/actions/get-sidebar-history";
import AccountSummary from "@/components/layout/sidebar/_components/AccountSummary";
import EmptyHistory from "@/components/layout/sidebar/_components/EmptyHistory";
import HistoryItem from "@/components/layout/sidebar/_components/HistoryItem";
import LoginButton from "@/components/layout/sidebar/_components/LoginButton";
import { Logo } from "@/components/Logo";

type SidebarProps = {
    className?: string;
};

export default async function Sidebar({ className }: SidebarProps) {
    const session = await auth();
    const { isPro } = await getSubscriptionStatus();
    const histories = await getSidebarHistory();

    return (
        <aside className={cn(
            "bg-white h-screen hidden p-6 sticky top-0 w-75",
            "lg:flex lg:flex-col lg:gap-6",
            className,
        )}>
            <Link
                href="/"
                className="self-start"
            >
                <Logo className="h-10" />
            </Link>
            <div className="flex flex-1 flex-col gap-4">
                <span className="[text-box:trim-both_cap_alphabetic] text-sm">
                    生成履歴
                </span>
                {histories.length > 0 ? (
                    <ul className="flex flex-col gap-2 overflow-y-auto">
                        {histories.map((history) => (
                            <HistoryItem
                                key={history.id}
                                id={history.id}
                                baseColor={history.baseColor}
                                mainColor={history.mainColor}
                                accentColor={history.accentColor}
                            />
                        ))}
                    </ul>
                ) : (
                    <EmptyHistory />
                )}
            </div>
            {session?.user ? (
                <AccountSummary
                    user={session.user}
                    isPro={isPro}
                />
            ) : (
                <LoginButton />
            )}
        </aside>
    );
}