export const navigation = [
    {
        id: "about",
        category: "About",
        links: [
            {
                title: "お知らせ・更新情報",
                url: "/news",
            },
            {
                title: "料金プラン",
                url: "/pricing",
            },
        ],
    },
    {
        id: "legal",
        category: "Legal",
        links: [
            {
                title: "利用規約",
                url: "/terms",
            },
            {
                title: "プライバシーポリシー",
                url: "/privacy",
            },
            {
                title: "特商法表記",
                url: "/commercial-transactions",
            },
        ],
    },
    {
        id: "support",
        category: "Support",
        links: [
            {
                title: "よくある質問",
                url: "/faq",
            },
            {
                title: "お問い合わせ",
                url: "/contact",
            },
        ],
    },
] as const;