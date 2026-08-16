import Image from "next/image";
import type { Session } from "next-auth";
import { cn } from "@/lib/utils";
import CustomerPortalButton from "@/components/ui/CustomerPortalButton";
import UpgradeButton from "@/components/ui/UpgradeButton";

type AccountSummaryProps = {
    user: Session["user"];
    isPro: boolean;
};

export default function AccountSummary({ user, isPro }: AccountSummaryProps) {
    return (
        <div className="p-1 rounded-[28px] bg-white">
            <div className="flex items-center gap-5 p-5 rounded-3xl bg-sky-100">
                <div className="flex flex-1 gap-2">
                    <Image
                        src={user.image || "/default-avatar.png"}
                        width={44}
                        height={44}
                        alt=""
                        className="rounded-full"
                    />
                    <div className={cn(
                        "flex-col flex-1 gap-2.5 hidden",
                        "min-[430px]:flex",
                    )}>
                        <span className={cn(
                            "text-[10px] [text-box:trim-both_cap_alphabetic] p-1.5 rounded-full w-fit",
                            isPro ? "bg-linear-to-r from-sky-400 to-sky-500 text-white" : "bg-white text-slate-500",
                        )}>
                            {isPro ? "Proプラン" : "無料プラン"}
                        </span>
                        <span className="text-sm [text-box:trim-both_cap_alphabetic] pl-1.5 whitespace-nowrap text-ellipsis overflow-x-clip">
                            {user.name}
                        </span>
                    </div>
                </div>
                {isPro ? (
                    <CustomerPortalButton />
                ) : (
                    <UpgradeButton isPro={isPro} />
                )}
            </div>
        </div>
    );
}