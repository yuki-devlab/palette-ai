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
            "flex flex-col gap-10 items-center justify-center mx-auto",
            "xl:gap-12",
        )}>
            <div className={cn(
                "flex flex-col gap-7 items-center px-5",
                "md:px-8",
                "xl:px-0",
            )}>
                <div className={cn(
                    "w-40 h-10 bg-slate-300",
                )} />
                <p className="[text-box:trim-both_cap_alphabetic] text-center text-slate-500 leading-loose">
                    Palette AIは、ベースカラー・メインカラー・アクセントカラーを自動生成するAIツールです。
                    <br />
                    配色の知識がない方でも、簡単に生成することができます。
                </p>
            </div>
            <ArrowIcon className={cn(
                "h-14",
                "xl:h-16",
            )} />
            <GenerationMenu />
        </div>
    );
}