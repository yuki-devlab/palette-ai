import Link from "next/link";

export default function CommercialTransactionsContent() {
    return (
        <>
            <h2 className="font-bold text-[22px] [text-box:trim-both_cap_alphabetic]">
                事業者
            </h2>
            <p className="[text-box:trim-both_cap_alphabetic] mb-10">
                請求を頂ければ遅滞なく開示いたします。
            </p>

            <h2 className="font-bold text-[22px] [text-box:trim-both_cap_alphabetic]">
                住所
            </h2>
            <p className="[text-box:trim-both_cap_alphabetic] mb-10">
                同上
            </p>

            <h2 className="font-bold text-[22px] [text-box:trim-both_cap_alphabetic]">
                お問い合わせ先
            </h2>
            <p className="[text-box:trim-both_cap_alphabetic] mb-10">
                メールアドレス：contact@palette-ai.jp
                <br />
                フォーム：<Link href="/contact" className="text-blue-500 hover:underline hover:underline-offset-[0.25em]">お問い合わせ</Link>
            </p>

            <h2 className="font-bold text-[22px] [text-box:trim-both_cap_alphabetic]">
                メールアドレス
            </h2>
            <p className="[text-box:trim-both_cap_alphabetic] mb-10">
                contact@palette-ai.jp
            </p>

            <h2 className="font-bold text-[22px] [text-box:trim-both_cap_alphabetic]">
                お支払い方法
            </h2>
            <p className="[text-box:trim-both_cap_alphabetic] mb-10">
                クレジットカード、またはその他当社が定める方法（Apple Pay、Google Pay、Stripe Link）によりお支払いいただきます
            </p>

            <h2 className="font-bold text-[22px] [text-box:trim-both_cap_alphabetic]">
                返品・キャンセル・解約について
            </h2>
            <p className="[text-box:trim-both_cap_alphabetic] mb-5">
                デジタルサービスという性質上、お客様都合による返金・キャンセルはお受けしておりません。
            </p>
            <p className="[text-box:trim-both_cap_alphabetic] mb-5">
                弊社の責による長期システム停止等、当社利用規約で定める場合に限り、未提供日数を日割り計算の上で返金いたします。
            </p>
            <p className="[text-box:trim-both_cap_alphabetic]">
                マイページから次回更新日の24時間前までに解約いただけます。解約後も当該請求期間の終了日まではサービスをご利用いただけます。
            </p>
        </>
    );
}