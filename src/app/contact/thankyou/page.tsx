import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
    title: "お問い合わせを受け付けました",
    description: "Palette AIのお問い合わせ完了ページです。",
    path: "/contact/thankyou",
    noIndex: true,
});

export default function ThankyouPage() {
    return (
        <div className="flex flex-col items-center mx-auto">
            <p>お問い合わせを受け付けました。</p>
        </div>
    );
}