import Image from "next/image";
import type { Session } from "next-auth";
import { cn } from "@/lib/utils";
import UpgradeButton from "@/components/ui/modal/account-settings/_components/UpgradeButton";

type AccountSummaryProps = {
    user: Session["user"];
    isPro: boolean;
};

export default function AccountSummary({ user, isPro }: AccountSummaryProps) {
    return (
        <div className={cn(
            "bg-white p-1 rounded-[20px]",
            "md:p-1.5",
            "lg:p-1",
            "xl:p-1.5",
        )}>
            <div className={cn(
                "bg-sky-100 flex gap-2 items-center p-3 rounded-2xl",
                "md:p-4",
                "lg:p-3",
                "xl:p-4",
            )}>
                <div className={cn(
                    "flex flex-1 gap-1 items-center",
                    "xl:gap-2",
                )}>
                    <Image
                        src={user.image || "/default-avatar.png"}
                        width={44}
                        height={44}
                        alt=""
                        className={cn(
                            "h-9 rounded-full w-9",
                            "md:h-10 md:w-10",
                            "lg:h-8 lg:w-8",
                            "xl:h-11 xl:w-11",
                        )}
                    />
                    <div className={cn(
                        "flex flex-1 flex-col gap-2 translate-y-[-1.5px]",
                        "md:translate-y-[-1.25px]",
                        "lg:-translate-y-px",
                        "xl:gap-2.5 xl:-translate-y-0.5",
                    )}>
                        <span className={cn(
                            "bg-white p-1 rounded-full text-[8px] [text-box:trim-both_cap_alphabetic] text-slate-500 w-fit",
                            "md:text-[9px]",
                            "lg:text-[8px]",
                            "xl:p-1.5 xl:text-[10px]",
                        )}>
                            {isPro ? "Proプラン" : "無料プラン"}
                        </span>
                        <span className={cn(
                            "overflow-x-clip pl-1 text-[10px] [text-box:trim-both_cap_alphabetic] text-ellipsis whitespace-nowrap",
                            "md:text-xs",
                            "lg:text-[10px]",
                            "xl:pl-1.5 xl:text-sm",
                        )}>
                            {user.name}
                        </span>
                    </div>
                </div>
                <UpgradeButton />
            </div>
        </div>
    );
}