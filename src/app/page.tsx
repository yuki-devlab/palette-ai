import { KeyboardDoubleArrowDown as KeyboardDoubleArrowDownW700 } from "@material-symbols-svg/react/w700";
import ModeCarousel from "@/components/ModeCarousel";

export default function HomePage() {
    return (
        <div className={`
            flex flex-col gap-7 h-full items-center justify-center
            md:gap-8
            lg:gap-10
        `}>
            <div className={`
                flex flex-col gap-7 items-center px-4
                md:gap-8 md:p-0
            `}>
                <div className="w-50 h-13 bg-slate-200" />
                <p className={`
                    leading-loose [text-box:trim-both_cap_alphabetic] text-center text-slate-500 text-sm
                    lg:text-base
                `}>
                    Palette AIは、ベースカラー・メインカラー・アクセントカラーを自動生成するAIツールです。
                    <br />
                    配色の知識がない方でも、簡単に生成することができます。
                </p>
            </div>
            <KeyboardDoubleArrowDownW700
                size={40}
                color="var(--color-sky-500)"
                className="animate-bounce"
            />
            <ModeCarousel />
        </div>
    );
}