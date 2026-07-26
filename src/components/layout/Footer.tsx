import Link from "next/link";
import { cn } from "@/lib/utils";

const FOOTER_INFO_LIST = [
    {
        id: "about",
        title: "About",
        links: [
            {
                title: "Palette AIについて",
                url: "/about",
            },
            {
                title: "使い方",
                url: "/guide",
            },
            {
                title: "お知らせ",
                url: "/news",
            },
            {
                title: "料金プラン",
                url: "/pricing",
            },
        ],
    },
    {
        id: "legal",
        title: "Legal",
        links: [
            {
                title: "利用規約",
                url: "/terms",
            },
            {
                title: "プライバシーポリシー",
                url: "/privacy",
            },
            {
                title: "特商法表記",
                url: "/commercial-law",
            },
        ],
    },
    {
        id: "support",
        title: "Support",
        links: [
            {
                title: "よくある質問",
                url: "/faq",
            },
            {
                title: "お問い合わせ",
                url: "/contact",
            },
        ],
    },
] as const;

export default function Footer() {
    return (
        <footer className={cn(
            "pt-12",
            "lg:pt-9",
            "xl:flex xl:justify-center xl:pt-12",
        )}>
            <div className={cn(
                "flex flex-col gap-12",
                "lg:gap-9",
                "xl:gap-12 xl:max-w-4xl xl:w-full"
            )}>
                <div className={cn(
                    "flex flex-col gap-12",
                    "lg:flex-row lg:justify-between",
                )}>
                    <div className={cn(
                        "flex flex-col gap-4",
                        "lg:gap-3",
                        "xl:gap-4",
                    )}>
                        <Link
                            href="/"
                            className="w-fit"
                        >
                            <div className="w-29.25 h-7 bg-[#D9D9D9]" />
                        </Link>
                        <p className={cn(
                            "[text-box:trim-both_cap_alphabetic] text-slate-500 text-xs leading-relaxed",
                            "lg:text-[10px]",
                            "xl:text-xs",
                        )}>
                            クリエイターのための
                            <br className={cn(
                                "hidden",
                                "lg:block",
                            )} />
                            配色支援ツール
                        </p>
                    </div>
                    <div className={cn(
                        "gap-12 grid grid-cols-2",
                        "lg:gap-20 lg:grid-cols-[repeat(3,max-content)]",
                    )}>
                        {FOOTER_INFO_LIST.map((footerInfo) => (
                            <nav
                                key={footerInfo.id}
                                className={cn(
                                    "flex flex-col gap-7",
                                    "lg:gap-6",
                                    "xl:gap-7",
                                )}
                            >
                                <h3 className={cn(
                                    "font-bold [text-box:trim-both_cap_alphabetic] text-slate-500",
                                    "lg:text-sm",
                                    "xl:text-base",
                                )}>
                                    {footerInfo.title}
                                </h3>
                                <ul className={cn(
                                    "flex flex-col gap-6",
                                    "lg:gap-5",
                                    "xl:gap-6",
                                )}>
                                    {footerInfo.links.map((footerLink) => (
                                        <li key={footerLink.url}>
                                            <Link
                                                href={footerLink.url}
                                                className={cn(
                                                    "block [text-box:trim-both_cap_alphabetic] text-slate-500 text-sm",
                                                    "hover:text-slate-800",
                                                    "lg:text-xs",
                                                    "xl:text-sm",
                                                )}
                                            >
                                                {footerLink.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        ))}
                    </div>
                </div>
                <p className={cn(
                    "border-slate-300 border-t py-6 [text-box:trim-both_cap_alphabetic] text-center text-slate-500 text-xs",
                    "lg:py-5 text-[10px]",
                    "xl:py-6 xl:text-xs",
                )}>
                    &copy; 2026 Palette AI
                </p>
            </div>
        </footer>
    );
}