import { createMetadata } from "@/lib/metadata";
import { getCategories, getNews } from "@/lib/microcms";
import { cn } from "@/lib/utils";
import NewsCard from "@/app/news/_components/NewsCard";
import ToggleButton from "@/app/news/_components/ToggleButton";

type NewsPageProps = {
    searchParams: Promise<{ category?: string }>;
};

export const metadata = createMetadata({
    title: "お知らせ・更新情報",
    description: "Palette AIのお知らせ・更新情報ページです。新機能の追加やアップデート内容、障害・メンテナンス情報など、サービスに関する最新情報をお届けします。",
    path: "/news",
});

export default async function NewsPage({ searchParams }: NewsPageProps) {
    const { category: currentCategoryId } = await searchParams;
    const [categoriesData, newsData] = await Promise.all([
        getCategories(),
        getNews(currentCategoryId),
    ]);

    return (
        <div className={cn(
            "flex flex-col gap-10 items-center mx-auto px-5 w-full",
            "md:px-8",
            "xl:px-0 xl:w-auto",
        )}>
            <div className="flex flex-col gap-8 items-center">
                <h1 className="font-semibold text-3xl [text-box:trim-both_cap_alphabetic]">
                    お知らせ・更新情報
                </h1>
                <ToggleButton
                    categories={categoriesData}
                    currentCategoryId={currentCategoryId}
                />
            </div>
            <div className="flex flex-col w-full">
                {newsData.map((news, index) => (
                    <NewsCard
                        key={news.id}
                        news={news}
                        isLast={index === newsData.length - 1}
                    />
                ))}
            </div>
        </div>
    );
}