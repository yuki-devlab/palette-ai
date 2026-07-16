import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { HelpFill } from "@material-symbols-svg/react";
import { getSidebarHistory } from "@/actions/get-sidebar-history";
import HistoryItem from "@/components/sidebar/HistoryItem";
import SidebarFooter from "@/components/sidebar/SidebarFooter";
import SidebarHeader from "@/components/sidebar/SidebarHeader";

export default async function Sidebar() {
    const t = await getTranslations("sidebar.history");
    const histories = await getSidebarHistory();

    return (
        <aside className="bg-white flex flex-col h-screen justify-between p-6 sticky top-0 w-80">
            <div className="mb-6 shrink-0">
                <SidebarHeader />
            </div>
            <div className="flex flex-1 flex-col gap-4 overflow-hidden">
                <div className="flex gap-1 items-center">
                    <span className="[text-box:trim-both_cap_alphabetic] text-sm">
                        {t("title")}
                    </span>
                    <HelpFill
                        size={16}
                        color="var(--color-slate-400)"
                    />
                </div>
                {histories.length > 0 ? (
                    <ul className="flex flex-1 flex-col gap-2 overflow-y-auto">
                        <Suspense fallback={null}>
                            {histories.map((history) => (
                                <HistoryItem
                                    key={history.id}
                                    id={history.id}
                                    baseColor={history.baseColor}
                                    mainColor={history.mainColor}
                                    accentColor={history.accentColor}
                                />
                            ))}
                        </Suspense>
                    </ul>
                ) : (
                    <p className="[text-box:trim-both_cap_alphabetic] text-slate-500 text-xs">
                        {t("empty")}
                    </p>
                )}
            </div>
            <div className="mt-6 shrink-0">
                <SidebarFooter />
            </div>
        </aside>
    );
}