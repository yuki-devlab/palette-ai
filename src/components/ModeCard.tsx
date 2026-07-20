"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { nanoid } from "nanoid";

type ModeCardProps = {
    modeInfo: {
        id: string;
        url: string;
        title: string;
        description: string;
    },
    isCenter: boolean,
};

export default function ModeCard({ modeInfo, isCenter }: ModeCardProps) {
    const router = useRouter();

    const handleNavigate = (e: React.MouseEvent) => {
        e.preventDefault();

        const historyId = nanoid(15);

        sessionStorage.setItem("generatedColors", JSON.stringify({
            id: historyId,
            mode: "random",
        }));

        router.push(`${modeInfo.url}?id=${historyId}`);
    };
    
    return (
        <li className={`
            mx-2.5
            md:mx-3
            lg:mx-0
        `}>
            <Link
                href={modeInfo.url}
                onClick={modeInfo.id === "random" ? handleNavigate : undefined}
                className={`
                    bg-white block p-2 rounded-lg shadow-md transition-all
                    lg:flex lg:gap-5 lg:items-center lg:pr-5 lg:rounded
                    hover:shadow-lg hover:-translate-y-1
                `}
            >
                <div className={`
                    bg-sky-100 h-44 relative rounded-t w-2xs
                    md:h-50 md:w-xs
                    lg:h-28 lg:rounded lg:shrink-0 lg:w-28
                `}>
                    {modeInfo.id === "random" && (
                        <span className={`
                            absolute bg-sky-500 font-bold px-3 py-3.5 rounded-br rounded-tl [text-box:trim-both_cap_alphabetic] text-white text-xs
                            md:text-sm
                            lg:px-2.5 lg:py-3 lg:text-[10px]
                        `}>
                            おすすめ
                        </span>
                    )}
                </div>
                <div className={`
                    flex flex-col gap-6 pb-4 pt-6 px-4
                    lg:gap-4.5 lg:p-0
                `}>
                    <h3 className={`
                        font-bold [text-box:trim-both_cap_alphabetic] text-center
                        ${modeInfo.id === "remaining" ? "text-[15px] md:text-[15px] md:text-center lg:text-base lg:text-left" : "text-[17px] md:text-lg lg:text-base lg:text-left"}
                    `}>
                        {modeInfo.title}
                    </h3>
                    <p className={`
                        leading-relaxed [text-box:trim-both_cap_alphabetic] text-slate-500 text-xs whitespace-pre-wrap
                        md:text-sm
                        lg:text-xs
                    `}>
                        {modeInfo.description}
                    </p>
                </div>
            </Link>
        </li>
    );
}