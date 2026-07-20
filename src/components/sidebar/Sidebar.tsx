import { Suspense } from "react";
import { HelpFill as HelpFillW700 } from "@material-symbols-svg/react/w700";
import { getSidebarHistory } from "@/actions/get-sidebar-history";
import HistoryItem from "@/components/sidebar/HistoryItem";
import SidebarFooter from "@/components/sidebar/SidebarFooter";
import SidebarHeader from "@/components/sidebar/SidebarHeader";

export default async function Sidebar() {
    const histories = await getSidebarHistory();

    return (
        <aside className="bg-white flex-col h-screen justify-between p-6 sticky top-0 w-80 hidden xl:flex">
            <div className="mb-6 shrink-0">
                <SidebarHeader />
            </div>
            <div className="flex flex-1 flex-col gap-4 overflow-hidden">
                <div className="flex gap-1 items-center">
                    <span className="[text-box:trim-both_cap_alphabetic] text-sm">
                        生成履歴
                    </span>
                    <div className="relative group">
                        <HelpFillW700
                            size={17}
                            className="text-slate-400 hover:text-slate-500 transition-all"
                        />
                        <div className="absolute left-1/2 -translate-x-1/2 hidden group-hover:flex flex-col items-center top-full z-30 transition-all">
                            <div className="w-3 h-3 bg-slate-800 rotate-45 transform translate-y-1.5 rounded-[1px]" />
                            <div className="w-35 leading-relaxed text-white text-[10px] p-3 [text-box:trim-both_cap_alphabetic] bg-slate-800 rounded-[1px]">
                                ログインすると生成履歴を保存できます
                            </div>
                        </div>
                    </div>
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
                        なし
                    </p>
                )}
            </div>
            <div className="mt-6 shrink-0">
                <SidebarFooter />
            </div>
        </aside>
    );
}