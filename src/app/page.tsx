import { createMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";
import GenerationMenu from "@/app/_components/GenerationMenu";
import ArrowIcon from "@/components/icons/ArrowIcon";

export const metadata = createMetadata({
    path: "/",
});

export default function HomePage() {
    return (
        <div className={cn(
            "flex flex-1 flex-col gap-10 items-center justify-center py-16",
            "xl:gap-12",
        )}>
            <div className={cn(
                "flex flex-col gap-5 items-center",
                "md:gap-6",
                "xl:gap-8",
            )}>
                <div className={cn(
                    "w-28 h-7 bg-slate-300",
                    "md:w-32 md:h-8",
                    "lg:w-28 lg:h-7",
                    "xl:w-40 xl:h-10",
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
            <ArrowIcon className={cn(
                "h-12",
                "md:h-14",
                "lg:h-12",
                "xl:h-16",
            )} />
            <GenerationMenu />
        </div>
    );
}