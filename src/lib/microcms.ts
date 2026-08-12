import { createClient } from "microcms-js-sdk";
import { Category, News } from "@/types/news";

export const client = createClient({
    serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN || "",
    apiKey: process.env.MICROCMS_API_KEY || "",
});

export async function getCategories() {
    const data = await client.getList<Category>({
        endpoint: "categories",
    });

    return data.contents;
}

export async function getNews() {
    const data = await client.getList<News>({
        endpoint: "news",
        queries: {
            orders: "-publishedAt",
        },
    });

    return data.contents;
}