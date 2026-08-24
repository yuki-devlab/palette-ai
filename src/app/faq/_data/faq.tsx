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
                        AIによって生成された配色は、プレビューですぐに確認することができます。
                    </>
                ),
            },
            {
                question: "無料で使用できますか？",
                answer: (
                    <>
                        はい、無料で使用することが可能です。
                        <br />
                        ただし、１日における生成回数や履歴の保存回数などに制限があります。
                        詳しくは、
                        <Link
                            href="/pricing"
                            className={cn(
                                "text-blue-500",
                                "hover:underline hover:underline-offset-[0.25em]",
                            )}
                        >
                            こちら
                        </Link>
                        をご確認ください。
                    </>
                ),
            },
        ],
    },
    {
        category: "アカウント",
        items: [
            {
                question: "名前やプロフィール画像を変更することはできますか？",
                answer: (
                    <>
                        いいえ。
                        <br />
                        本サービスは、Googleアカウントを使ったログインに対応しており、名前やメールアドレス、プロフィール画像などは変更できない仕様となっております。
                    </>
                ),
            },
            {
                question: "退会できますか？",
                answer: (
                    <>
                        はい。ログイン後のアカウント設定画面から手続きを行ってください。
                    </>
                ),
            },
        ],
    },
    {
        category: "料金プラン",
        items: [
            {
                question: "無料プランと有料プランの違いは何ですか？",
                answer: (
                    <>
                        主に、１日における生成回数の上限や履歴の保存回数の上限が異なります。
                        <br />
                        詳しくは、
                        <Link
                            href="/pricing"
                            className={cn(
                                "text-blue-500",
                                "hover:underline hover:underline-offset-[0.25em]",
                            )}
                        >
                            こちら
                        </Link>
                        をご確認ください。
                    </>
                ),
            },
            {
                question: "クレジットカードは使用できますか？",
                answer: (
                    <>
                        はい、使用できます。
                        <br />
                        本サービスでは、Stripeを使った決済システムを導入しており、クレジットカードやApple Pay、Google Payなどでの支払いに対応しています。
                    </>
                ),
            },
            {
                question: "月額プランから年額プランに変更することはできますか？",
                answer: (
                    <>
                        はい。アカウント設定画面の「お支払いを管理」から手続きを行ってください。
                    </>
                ),
            },
            {
                question: "解約はできますか？",
                answer: (
                    <>
                        はい。アカウント設定画面の「お支払いを管理」から手続きを行ってください。
                    </>
                ),
            },
        ],
    },
];