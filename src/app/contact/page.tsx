import Link from "next/link";
import { createMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";
import ContactForm from "@/app/contact/_components/ContactForm";

export const metadata = createMetadata({
    title: "お問い合わせ",
    description: "Palette AIのお問い合わせページです。サービスに関するご質問やご相談などがございましたら、お気軽にお問い合わせください。",
    path: "/contact",
});

export default function ContactPage() {
    return (
        <div className={cn(
            "flex flex-col gap-10 items-center mx-auto px-5 w-full",
            "md:px-8",
            "xl:px-0 xl:w-xl",
        )}>
            <h1 className="font-bold text-3xl [text-box:trim-both_cap_alphabetic]">
                お問い合わせ
            </h1>
            <p className="leading-relaxed [text-box:trim-both_cap_alphabetic] text-slate-500">
                お問い合わせの前に、
                <Link
                    href="/faq"
                    className={cn(
                        "text-blue-500",
                        "hover:underline hover:underline-offset-[0.25em]",
                    )}
                >
                    よくある質問ページ
                </Link>
                をご確認ください。
                <br />
                上記で解決しない場合は、以下のフォームよりお気軽にお問い合わせください。
                <br />
                内容を確認のうえ、担当者よりご連絡いたします。
            </p>
            <hr className="bg-[repeating-linear-gradient(to_right,var(--color-slate-300)_0_4px,transparent_4px_8px)] border-none h-px w-full" />
            <ContactForm />
        </div>
    );
}