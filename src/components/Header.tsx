import Link from "next/link";
import { Menu } from "@material-symbols-svg/react";

export default function Header() {
    return (
        <header className={`
            bg-white grid grid-cols-[1fr_auto_1fr] items-center mt-4 mx-4 p-2.5 rounded-2xl shadow-sm
            md:max-w-lg md:mx-auto md:p-3 md:rounded-[20px] md:w-full
            xl:hidden
        `}>
            <div className="flex justify-self-start">
                <button
                    type="button"
                    className={`
                        text-slate-400
                        hover:text-slate-500
                    `}
                >
                    <Menu
                        className={`
                            h-7 w-7
                            md:h-8 md:w-8
                        `}
                    />
                </button>
            </div>
            <Link href="/">
                <div className={`
                    w-9 h-9 rounded-md bg-slate-300
                    md:w-10 md:h-10
                `} />
            </Link>
            <button className="font-bold text-xs [text-box:trim-both_cap_alphabetic] p-3 rounded-lg bg-slate-200 justify-self-end">
                ログイン
            </button>
        </header>
    );
}