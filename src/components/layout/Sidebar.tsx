import { auth } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { getSidebarHistory } from "@/actions/get-sidebar-history";
import AccountSummary from "@/components/ui/AccountSummary";
import HistoryItem from "@/components/ui/HistoryItem";
import HistoryTooltip from "@/components/ui/HistoryTooltip";
import SidebarLoginButton from "@/components/ui/login-button/SidebarLoginButton";

export default async function Sidebar() {
    const session = await auth();
    const histories = await getSidebarHistory();

    return (
        <aside className={cn(
            "bg-white flex-col gap-5 h-screen hidden p-5 sticky top-0 w-70",
            "lg:flex",
            "xl:gap-6 xl:p-6 xl:w-80",
        )}>
            <div className={cn(
                "w-8 h-8 bg-[#D9D9D9] rounded",
                "xl:w-10 xl:h-10",
            )} />
            <div className={cn(
                "flex flex-1 flex-col gap-4 min-h-0",
                "xl:gap-5",
            )}>
                <div className="flex gap-1 items-center">
                    <h2 className={cn(
                        "[text-box:trim-both_cap_alphabetic] text-xs",
                        "xl:text-sm",
                    )}>
                        生成履歴
                    </h2>
                    <HistoryTooltip />
                </div>
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
                    <p className={cn(
                        "text-[10px] [text-box:trim-both_cap_alphabetic] text-slate-500",
                        "xl:text-xs",
                    )}>
                        なし
                    </p>
                )}
            </div>
            {session?.user ? (
                <AccountSummary user={session.user} />
            ) : (
                <SidebarLoginButton />
            )}
        </aside>
    );
}