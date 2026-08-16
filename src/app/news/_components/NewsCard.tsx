import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { News } from "@/types/news";
import { cn } from "@/lib/utils";

type NewsCardProps = {
    news: News;
    isLast: boolean;
};

export default function NewsCard({ news, isLast }: NewsCardProps) {
    const formattedDate = format(
        new Date(news.publishedAt),
        "yyyy年M月d日",
        {
            locale: ja,
        },
    );

    return (
        <div className={cn(
            "flex gap-5",
            "md:gap-8",
            "xl:gap-6",
        )}>
            <div className="flex flex-col items-center">
                <div className="border-2 border-slate-300 h-4 rounded-full shrink-0 w-4" />
                {!isLast && (
                    <span className="bg-[repeating-linear-gradient(to_bottom,var(--color-slate-200)_0_6px,transparent_6px_12px)] h-full w-0.5" />
                )}
            </div>
            <div className={cn(
                "bg-white flex flex-col gap-4 mb-8 p-6 rounded-[20px] w-full",
                isLast && "mb-0",
                "xl:w-xl",
            )}>
                <div className={cn(
                    "flex justify-between",
                    "md:items-center",
                )}>
                    <div className={cn(
                        "flex flex-col gap-3",
                        "md:flex-row md:items-center",
                    )}>
                        <span className="[text-box:trim-both_cap_alphabetic] text-slate-500">
                            {formattedDate}
                        </span>
                        <span className={cn(
                            "font-semibold p-2 rounded-md [text-box:trim-both_cap_alphabetic] text-white text-xs w-fit",
                            news.category.id === "announcement" ? "bg-sky-500" : "bg-blue-500",
                        )}>
                            {news.category.name}
                        </span>
                    </div>
                    {news.version && (
                        <span className="font-semibold [text-box:trim-both_cap_alphabetic] text-slate-500 text-sm">
                            {news.version}
                        </span>
                    )}
                </div>
                <div className="flex flex-col gap-5">
                    <h2 className="font-semibold [text-box:trim-both_cap_alphabetic] text-lg">
                        {news.title}
                    </h2>
                    {news.description && (
                        <p className="leading-normal [text-box:trim-both_cap_alphabetic] text-slate-500 text-sm">
                            {news.description}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}