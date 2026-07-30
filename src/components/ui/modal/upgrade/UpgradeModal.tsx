import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Close } from "@material-symbols-svg/react/w700";
import { cn } from "@/lib/utils";
import SubscribeButton from "@/components/ui/modal/upgrade/_components/SubscribeButton";
import ToggleButton from "@/components/ui/modal/upgrade/_components/ToggleButton";

type UpgradeModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export default function UpgradeModal({ isOpen, onClose }: UpgradeModalProps) {
    const [isYearly, setIsYearly] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    if (!mounted) {
        return null;
    }

    const portal = document.getElementById("portal");

    if (!portal) {
        return null;
    }

    return createPortal(
        <div className={cn(
            "fixed flex inset-0 items-center justify-center px-5",
            isOpen ? "pointer-events-auto" : "pointer-events-none",
            "md:p-0",
        )}>
            <div
                className={cn(
                    "backdrop-blur-md bg-slate-500/25 fixed inset-0",
                    isOpen ? "opacity-100" : "opacity-0",
                )}
                onClick={onClose}
            >
                <button
                    type="button"
                    className={cn(
                        "absolute bg-slate-400 flex h-9 items-center justify-center right-5 rounded-full top-5 w-9",
                        "hover:bg-slate-500",
                        "md:h-10 md:right-6 md:top-6 md:w-10",
                        "lg:h-8 lg:right-5 lg:top-5 lg:w-8",
                        "xl:h-10 xl:right-6 xl:top-6 xl:w-10",
                    )}
                    onClick={onClose}
                >
                    <Close
                        color="var(--color-white)"
                        className={cn(
                            "h-5 w-5",
                            "lg:h-4.5 lg:w-4.5",
                            "xl:h-5 xl:w-5",
                        )}
                    />
                </button>
            </div>
            <div className={cn(
                "bg-sky-100 flex flex-col gap-5 items-center p-5 rounded-4xl shadow-2xl w-full z-10 max-w-sm",
                isOpen ? "opacity-100 scale-100" : "opacity-0 scale-50",
                "md:w-md md:max-w-none"
            )}>
                <div className={cn(
                    "flex flex-col gap-4 items-center w-full",
                )}>
                    <ToggleButton
                        isYearly={isYearly}
                        onChange={setIsYearly}
                    />
                    <div className={cn(
                        "bg-white flex flex-col gap-8 p-6 rounded-3xl w-full",
                    )}>
                        <div className={cn(
                            "flex flex-col gap-5",
                        )}>
                            <span className={cn(
                                "font-bold [text-box:trim-both_cap_alphabetic] text-sky-500",
                                "md:text-[18px]"
                            )}>
                                PRO
                            </span>
                            <div className={cn(
                                "flex gap-2 items-center",
                            )}>
                                <div className={cn(
                                    "flex gap-1 items-end",
                                )}>
                                    <span className={cn(
                                        "font-bold [text-box:trim-both_cap_alphabetic] text-xl",
                                    )}>
                                        ¥
                                    </span>
                                    <span className={cn(
                                        "font-bold text-[32px] [text-box:trim-both_cap_alphabetic]",
                                    )}>
                                        {isYearly ? "500" : "625"}
                                    </span>
                                    <span className={cn(
                                        "[text-box:trim-both_cap_alphabetic] text-sm",
                                    )}>
                                        / 月
                                    </span>
                                </div>
                                <span className={cn(
                                    "bg-slate-200 p-2 rounded-full text-[10px] [text-box:trim-both_cap_alphabetic] text-slate-500",
                                )}>
                                    {isYearly ? "¥6,000 年払い" : "月払い"}
                                </span>
                            </div>
                        </div>
                        <ul className={cn(
                            "flex flex-col gap-6",
                        )}>
                            <li className={cn(
                                "decoration-[20%] decoration-dotted decoration-slate-300 [text-box:trim-both_cap_alphabetic] text-slate-500 text-sm underline underline-offset-[50%]",
                            )}>
                                すべての機能を使用可能
                            </li>
                            <li className={cn(
                                "decoration-[20%] decoration-dotted decoration-slate-300 [text-box:trim-both_cap_alphabetic] text-slate-500 text-sm underline underline-offset-[50%]",
                            )}>
                                高性能なAIモデル
                            </li>
                            <li className={cn(
                                "decoration-[20%] decoration-dotted decoration-slate-300 [text-box:trim-both_cap_alphabetic] text-slate-500 text-sm underline underline-offset-[50%]",
                            )}>
                                生成は１日に100回まで
                            </li>
                            <li className={cn(
                                "decoration-[20%] decoration-dotted decoration-slate-300 [text-box:trim-both_cap_alphabetic] text-slate-500 text-sm underline underline-offset-[50%]",
                            )}>
                                生成履歴の保存は無制限
                            </li>
                        </ul>
                        <SubscribeButton plan={isYearly ? "yearly" : "monthly"} />
                    </div>
                </div>
                <Link
                    href="/commercial-low"
                    className="text-[11px] [text-box:trim-both_cap_alphabetic] text-slate-500"
                >
                    特定商取引法に基づく表記
                </Link>
            </div>
        </div>,
        portal,
    );
}