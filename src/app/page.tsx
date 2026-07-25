import { cn } from "@/lib/utils";
import ArrowIcon from "@/components/icons/ArrowIcon";
import ModeCarousel from "@/components/ui/ModeCarousel";

export default function HomePage() {
    return (
        <div className={cn(
            "flex flex-col gap-8 items-center",
            "md:gap-11",
            "lg:gap-9",
            "xl:gap-11",
        )}>
            <div className={cn(
                "flex flex-col gap-7 items-center px-5",
                "md:gap-8 md:px-0",
                "lg:gap-6",
                "xl:gap-8",
            )}>
                <div className={cn(
                    "w-33.5 h-8 bg-[#D9D9D9]",
                    "md:w-37.5 md:h-9",
                    "lg:w-29.25 lg:h-7",
                    "xl:w-37.5 xl:h-9",
                )} />
                <p className={cn(
                    "[text-box:trim-both_cap_alphabetic] text-center text-slate-500 text-xs leading-loose",
                    "md:text-sm",
                    "lg:text-xs",
                    "xl:text-base",
                )}>
                    Palette AIは、ベースカラー・メインカラー・アクセントカラーを自動生成するAIツールです。
                    <br />
                    配色の知識がない方でも、簡単に生成することができます。
                </p>
            </div>
            <ArrowIcon
                className={cn(
                    "h-13",
                    "md:h-16",
                    "lg:h-12",
                    "xl:h-16",
                )}
            />
            <ModeCarousel />
        </div>
    );
}