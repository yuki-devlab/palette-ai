"use client";

import { useState, useTransition } from "react";
import { ArrowRightAlt as ArrowRightAltW700 } from "@material-symbols-svg/react/w700";
import { createCheckoutSession } from "@/actions/stripe";
import Link from "next/link";

export default function PricingClient() {
    const [isYearly, setIsYearly] = useState(true);
    const [isPending, startTransition] = useTransition();

    const handleCheckout = () => {
        startTransition(async () => {
            try {
                const { url } = await createCheckoutSession({
                    plan: isYearly ? "yearly" : "monthly"
                });

                if (url) {
                    window.location.href = url;
                }
            } catch (error) {
                console.error("決済セッションの作成に失敗しました：", error);
                alert("エラーが発生しました。もう一度お試しください。");
            }
        });
    };

    return (
        <div className="flex flex-col gap-10 items-center justify-center min-h-screen mx-auto w-fit">
            <h1 className="font-bold text-3xl [text-box:trim-both_cap_alphabetic]">
                料金プラン
            </h1>
            <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-6 items-center">
                    <div className="bg-slate-200 flex items-center p-1 rounded-full w-fit">
                        <button
                            type="button"
                            onClick={() => setIsYearly(false)}
                            className={`
                                font-bold h-[stretch] px-3 py-2.5 rounded-full [text-box:trim-both_cap_alphabetic] text-slate-500
                                ${isYearly ? "" : "bg-white text-slate-800"}
                            `}
                        >
                            月ごと
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsYearly(true)}
                            className={`
                                flex gap-2 items-center px-3 py-2.5 rounded-full
                                ${isYearly ? "bg-white" : ""}
                            `}
                        >
                            <span className={`
                                font-bold [text-box:trim-both_cap_alphabetic]
                                ${isYearly ? "" : "text-slate-500"}
                            `}>
                                年ごと
                            </span>
                            <span className="bg-sky-500 p-2 rounded-full [text-box:trim-both_cap_alphabetic] text-white text-xs">
                                -25%
                            </span>
                        </button>
                    </div>
                    <div className="flex gap-6">
                        <div className="bg-white flex flex-col gap-10 p-9 rounded-3xl shadow w-sm">
                            <div className="flex flex-col gap-6">
                                <h3 className="font-bold [text-box:trim-both_cap_alphabetic] text-slate-500 text-xl">
                                    無料プラン
                                </h3>
                                <div className="flex gap-3 items-center">
                                    <p className="flex gap-1 items-end">
                                        <span className="font-bold [text-box:trim-both_cap_alphabetic] text-xl">
                                            ¥
                                        </span>
                                        <span className="font-bold text-4xl [text-box:trim-both_cap_alphabetic]">
                                            0
                                        </span>
                                        <span className="[text-box:trim-both_cap_alphabetic]">
                                            / 月
                                        </span>
                                    </p>
                                    <span className="bg-slate-200 p-3 rounded-full [text-box:trim-both_cap_alphabetic] text-slate-500 text-xs">
                                        ずっと無料
                                    </span>
                                </div>
                            </div>
                            <ul className="flex flex-col gap-8">
                                <li className="decoration-[20%] decoration-dotted decoration-slate-300 [text-box:trim-both_cap_alphabetic] text-slate-500 underline underline-offset-[50%]">
                                    すべての機能を使用可能
                                </li>
                                <li className="decoration-[20%] decoration-dotted decoration-slate-300 [text-box:trim-both_cap_alphabetic] text-slate-500 underline underline-offset-[50%]">
                                    標準のAIモデル
                                </li>
                                <li className="decoration-[20%] decoration-dotted decoration-slate-300 [text-box:trim-both_cap_alphabetic] text-slate-500 underline underline-offset-[50%]">
                                    生成は１日に10回まで
                                </li>
                                <li className="decoration-[20%] decoration-dotted decoration-slate-300 [text-box:trim-both_cap_alphabetic] text-slate-500 underline underline-offset-[50%]">
                                    生成履歴は最新10件まで
                                </li>
                            </ul>
                        </div>
                        <div className="bg-white flex flex-col gap-10 p-9 rounded-3xl shadow w-sm">
                            <div className="flex flex-col gap-6">
                                <h3 className="font-bold [text-box:trim-both_cap_alphabetic] text-sky-500 text-xl">
                                    Proプラン
                                </h3>
                                <div className="flex gap-3 items-center">
                                    <p className="flex gap-1 items-end">
                                        <span className="font-bold [text-box:trim-both_cap_alphabetic] text-xl">
                                            ¥
                                        </span>
                                        <span className="font-bold text-4xl [text-box:trim-both_cap_alphabetic]">
                                            {isYearly ? "500" : "675"}
                                        </span>
                                        <span className="[text-box:trim-both_cap_alphabetic]">
                                            / 月
                                        </span>
                                    </p>
                                    <span className="bg-slate-200 p-3 rounded-full [text-box:trim-both_cap_alphabetic] text-slate-500 text-xs">
                                        {isYearly ? "¥6,000 年払い" : "月払い"}
                                    </span>
                                </div>
                            </div>
                            <ul className="flex flex-col gap-8">
                                <li className="decoration-[20%] decoration-dotted decoration-slate-300 [text-box:trim-both_cap_alphabetic] text-slate-500 underline underline-offset-[50%]">
                                    すべての機能を使用可能
                                </li>
                                <li className="decoration-[20%] decoration-dotted decoration-slate-300 [text-box:trim-both_cap_alphabetic] text-slate-500 underline underline-offset-[50%]">
                                    高性能なAIモデル
                                </li>
                                <li className="decoration-[20%] decoration-dotted decoration-slate-300 [text-box:trim-both_cap_alphabetic] text-slate-500 underline underline-offset-[50%]">
                                    生成は１日に100回まで
                                </li>
                                <li className="decoration-[20%] decoration-dotted decoration-slate-300 [text-box:trim-both_cap_alphabetic] text-slate-500 underline underline-offset-[50%]">
                                    生成履歴は無制限
                                </li>
                            </ul>
                            <button
                                type="button"
                                onClick={handleCheckout}
                                disabled={isPending}
                                className="bg-sky-500 h-14 relative rounded-full [text-box:trim-both_cap_alphabetic] hover:bg-blue-500"
                            >
                                {isPending ? (
                                    <div className="flex gap-3 items-center justify-center">
                                        <div className="animate-spin border-3 border-t-white border-white/25 h-4.5 rounded-full w-4.5" />
                                        <span className="font-bold [text-box:trim-both_cap_alphabetic] text-white">
                                            Proプランをはじめる
                                        </span>
                                    </div>
                                ) : (
                                    <>
                                        <span className="font-bold text-white">
                                            Proプランをはじめる
                                        </span>
                                        <ArrowRightAltW700
                                            size={24}
                                            color="var(--color-white)"
                                            className="absolute right-7 top-1/2 -translate-y-1/2"
                                        />
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
                <Link
                    href="/legal/commercial-transactions"
                    className="[text-box:trim-both_cap_alphabetic] text-right text-slate-500 text-sm hover:text-slate-800"
                >
                    特定商取引法に基づく表示
                </Link>
            </div>
        </div>
    );
}