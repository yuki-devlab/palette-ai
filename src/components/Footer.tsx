import Logo from "@/components/Logo";
import Link from "next/link";

export default function Footer() {
    const startYear = 2026;
    const currentYear = new Date().getFullYear();

    const displayYear = currentYear > startYear 
        ? `${startYear}-${currentYear}` 
        : `${startYear}`;

    return (
        <footer className={`
            px-4 py-8 flex flex-col gap-8
            lg:max-w-6xl lg:px-10 lg:mx-auto lg:w-full
        `}>
            <div className={`
                flex flex-col gap-13
                md:gap-15
                lg:justify-between lg:flex-row lg:gap-0
            `}>
                <div className="flex flex-col gap-4">
                    <div className="w-50 h-13 bg-slate-300" />
                    <p className="text-xs leading-relaxed [text-box:trim-both_cap_alphabetic] text-slate-500">
                        クリエイターのための配色支援ツール
                    </p>
                </div>
                <div className={`
                    grid grid-cols-1 gap-12
                    md:grid md:grid-cols-2 md:gap-14
                    lg:flex lg:flex-wrap
                `}>
                    <nav className={`
                        flex flex-col gap-8
                        md:gap-9
                        lg:gap-10
                    `}>
                        <h2 className="font-bold [text-box:trim-both_cap_alphabetic] text-slate-400 underline underline-offset-[50%]">
                            About
                        </h2>
                        <ul className="flex flex-col gap-7">
                            <li>
                                <Link
                                    href="/pricing"
                                    className={`
                                        block w-fit text-sm [text-box:trim-both_cap_alphabetic] text-slate-500
                                        hover:text-slate-800
                                    `}
                                >
                                    料金プラン
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    <nav className={`
                        flex flex-col gap-8
                        md:gap-9
                        lg:gap-10
                    `}>
                        <h2 className="font-bold [text-box:trim-both_cap_alphabetic] text-slate-400 underline underline-offset-[50%]">
                            Modes
                        </h2>
                        <ul className="flex flex-col gap-7">
                            <li>
                                <Link
                                    href={`/generate/result`}
                                    className={`
                                        block text-sm [text-box:trim-both_cap_alphabetic] text-slate-500 w-fit
                                        hover:text-slate-800
                                    `}
                                >
                                    おまかせ自動生成
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/generate/impression"
                                    className={`
                                        block text-sm [text-box:trim-both_cap_alphabetic] text-slate-500 w-fit
                                        hover:text-slate-800
                                    `}
                                >
                                    与えたい印象から自動生成
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/generate/condition"
                                    className={`
                                        block text-sm [text-box:trim-both_cap_alphabetic] text-slate-500 w-fit
                                        hover:text-slate-800
                                    `}
                                >
                                    指定した条件から自動生成
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/generate/remaining"
                                    className={`
                                        block text-sm [text-box:trim-both_cap_alphabetic] text-slate-500 w-fit
                                        hover:text-slate-800
                                    `}
                                >
                                    決まっている色から残りを自動生成
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/generate/image"
                                    className={`
                                        block text-sm [text-box:trim-both_cap_alphabetic] text-slate-500 w-fit
                                        hover:text-slate-800
                                    `}
                                >
                                    画像から配色を抽出
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/generate/website"
                                    className={`
                                        block text-sm [text-box:trim-both_cap_alphabetic] text-slate-500 w-fit
                                        hover:text-slate-800
                                    `}
                                >
                                    Webサイトから配色を抽出
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    <nav className={`
                        flex flex-col gap-8
                        md:gap-9
                        lg:gap-10
                    `}>
                        <h2 className="font-bold [text-box:trim-both_cap_alphabetic] text-slate-400 underline underline-offset-[50%]">
                            Legal
                        </h2>
                        <ul className="flex flex-col gap-7">
                            <li>
                                <Link
                                    href="/terms"
                                    className={`
                                        block w-fit text-sm [text-box:trim-both_cap_alphabetic] text-slate-500
                                        hover:text-slate-800
                                    `}
                                >
                                    利用規約
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/terms?tab=privacy"
                                    className={`
                                        block w-fit text-sm [text-box:trim-both_cap_alphabetic] text-slate-500
                                        hover:text-slate-800
                                    `}
                                >
                                    プライバシーポリシー
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/terms?tab=commercial-transactions"
                                    className={`
                                        block w-fit text-sm [text-box:trim-both_cap_alphabetic] text-slate-500
                                        hover:text-slate-800
                                    `}
                                >
                                    特商法表記
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    <nav className={`
                        flex flex-col gap-8
                        md:gap-9
                        lg:gap-10
                    `}>
                        <h2 className="font-bold [text-box:trim-both_cap_alphabetic] text-slate-400 underline underline-offset-[50%]">
                            Support
                        </h2>
                        <ul className="flex flex-col gap-7">
                            <li>
                                <Link
                                    href=""
                                    className={`
                                        block w-fit text-sm [text-box:trim-both_cap_alphabetic] text-slate-500
                                        hover:text-slate-800
                                    `}
                                >
                                    お問い合わせ
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            <hr className="border-slate-300" />
            <p className="text-[13px] [text-box:trim-both_cap_alphabetic] text-slate-500 text-center">
                &copy; {displayYear} Palette AI
            </p>
        </footer>
    );
}