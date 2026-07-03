import Image from "next/image";
import type { Session } from "next-auth";
import { useTranslations } from "next-intl";

type UserProfileProps = {
    user: Session["user"];
    isFreePlan: boolean;
};

export default function UserProfile({ user, isFreePlan }: UserProfileProps) {
    const t = useTranslations("sidebar");

    return (
        <div className="flex flex-1 gap-2 items-center">
            <button
                type="button"
                className="border border-slate-200 group p-0.5 rounded-full shrink-0 hover:border-slate-300"
            >
                <Image
                    src={user.image || "/default-avatar.png"}
                    alt=""
                    width={40}
                    height={40}
                    className="rounded-full group-hover:opacity-85"
                />
            </button>
            <div className="flex flex-col gap-3 min-w-0">
                <p className="text-[10px] [text-box:trim-both_cap_alphabetic] text-slate-500">
                    {isFreePlan ? t("plan.free") : t("plan.pro")}
                </p>
                <p className="-my-0.5 py-0.5 [text-box:trim-both_cap_alphabetic] text-xs truncate">
                    {user.name}
                </p>
            </div>
        </div>
    );
}