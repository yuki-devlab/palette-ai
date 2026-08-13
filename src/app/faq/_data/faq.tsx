import Link from "next/link";
import { FaqItemProps } from "@/app/faq/_components/FaqItem";
import { cn } from "@/lib/utils";

export type FaqDataProps = {
    category: string;
    items: FaqItemProps[];
};

export const faqData: FaqDataProps[] = [
    {
        category: "サービス",
        items: [
            {
                question: "Palette AIとは何ですか？",
                answer: (
                    <>
                        Palette AIは、ベースカラー・メインカラー・アクセントカラーを自動生成するAIツールです。
                        <br />
                        詳しくは、
                        <Link
                            href="/about"
                            className={cn(
                                "text-blue-500",
                                "hover:underline hover:underline-offset-[0.25em]",
                            )}
                        >
                            Palette AIについて
                        </Link>
                        をご確認ください。
                    </>
                ),
            },
        ],
    },
];