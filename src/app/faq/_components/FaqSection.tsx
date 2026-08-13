import { FaqDataProps } from "@/app/faq/_data/faq";
import FaqItem from "@/app/faq/_components/FaqItem";

export default function FaqSection({ category, items }: FaqDataProps) {
    return (
        <div className="bg-slate-200 flex flex-col gap-4 pb-2 pt-4 px-2 rounded-[28px]">
            <h2 className="font-bold pl-4 [text-box:trim-both_cap_alphabetic] text-slate-500">
                {category}
            </h2>
            <div>
                {items.map((item) => (
                    <FaqItem
                        key={item.question}
                        {...item}
                    />
                ))}
            </div>
        </div>
    );
}