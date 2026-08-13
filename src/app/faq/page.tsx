import { faqData } from "@/app/faq/_data/faq";
import { createMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";
import FaqSection from "@/app/faq/_components/FaqSection";

export const metadata = createMetadata({
    title: "よくある質問",
    description: "Palette AIのよくある質問ページです。基本的な使い方や料金プランなど、よくあるご質問にお答えします。",
    path: "/faq",
});

export default function FaqPage() {
    return (
        <div className={cn(
            "flex flex-col gap-10 items-center mx-auto px-5 w-full",
            "md:px-8",
            "xl:px-0 xl:w-auto",
        )}>
            <h1 className="font-bold text-3xl [text-box:trim-both_cap_alphabetic]">
                よくある質問
            </h1>
            <div className="flex flex-col gap-8 w-full">
                {faqData.map((section) => (
                    <FaqSection
                        key={section.category}
                        category={section.category}
                        items={section.items}
                    />
                ))}
            </div>
        </div>
    );
}