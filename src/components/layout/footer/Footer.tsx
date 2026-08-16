import Link from "next/link";
import { navigation } from "@/components/layout/footer/_data/navigation";
import { cn } from "@/lib/utils";
import FooterNav from "@/components/layout/footer/_components/FooterNav";
import { Logo } from "@/components/Logo";

export default function Footer() {
    return (
        <footer className={cn(
            "flex justify-center pt-16 px-5",
            "md:px-8",
            "xl:px-0",
        )}>
            <div className={cn(
                "flex flex-col gap-12 w-full",
                "xl:w-4xl",
            )}>
                <div className={cn(
                    "flex flex-col gap-12",
                    "xl:flex-row xl:justify-between",
                )}>
                    <div className="flex flex-col gap-3">
                        <Link
                            href="/"
                            className="self-start"
                        >
                            <Logo className="h-8" />
                        </Link>
                        <span className="leading-normal [text-box:trim-both_cap_alphabetic] text-slate-500 text-sm">
                            クリエイターのための
                            <br className={cn(
                                "hidden",
                                "xl:block",
                            )} />
                            配色支援ツール
                        </span>
                    </div>
                    <div className={cn(
                        "gap-10 grid grid-cols-2",
                        "md:gap-16 md:grid-cols-3",
                    )}>
                        {navigation.map((item) => (
                            <FooterNav
                                key={item.id}
                                category={item.category}
                                links={item.links}
                            />
                        ))}
                    </div>
                </div>
                <div className="border-slate-300 border-t flex justify-center py-6">
                    <small className="[text-box:trim-both_cap_alphabetic] text-slate-500 text-sm">
                        &copy; 2026 Palette AI
                    </small>
                </div>
            </div>
        </footer>
    );
}