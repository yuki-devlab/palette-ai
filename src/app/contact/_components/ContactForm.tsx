"use client";

import { useActionState, useEffect, useRef } from "react";
import Link from "next/link";
import { Turnstile } from "@marsidev/react-turnstile";
import { cn } from "@/lib/utils";
import { submitContact } from "@/actions/contact";
import FormAgreeCheckbox from "@/app/contact/_components/FormAgreeCheckbox";
import FormInput from "@/app/contact/_components/FormInput";
import FormTextarea from "@/app/contact/_components/FormTextarea";
import SubmitButton from "@/app/contact/_components/SubmitButton";

export default function ContactForm() {
    const [state, formAction] = useActionState(submitContact, null);

    // ② HTMLの <form> 要素を参照するための Ref
    const formRef = useRef<HTMLFormElement>(null);

    // ③ メール送信成功時に入力欄をクリアする処理
    useEffect(() => {
        if (state?.success) {
            formRef.current?.reset();
        }
    }, [state]);

    return (
        <form
            action={formAction}
            ref={formRef}
            className="flex flex-col gap-8 w-full"
        >
            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-8">
                    <FormInput
                        type="text"
                        name="name"
                        placeholder="例）山田 太郎"
                        required
                        label="お名前"
                    />
                    <FormInput
                        type="email"
                        name="email"
                        placeholder="例）name@example.com"
                        required
                        label="メールアドレス"
                    />
                    <FormTextarea
                        name="content"
                        placeholder="お問い合わせ内容を入力してください"
                        required
                        label="お問い合わせ内容"
                    />
                </div>
                <FormAgreeCheckbox
                    name="agree"
                    label={
                        <>
                            <Link
                                href="/privacy"
                                className={cn(
                                    "text-blue-500",
                                    "hover:underline hover:underline-offset-[0.25em]",
                                )}
                            >
                                プライバシーポリシー
                            </Link>
                            に同意する
                        </>
                    }
                />
                <div className="flex justify-center">
                    <Turnstile siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!} />
                </div>
            </div>
            <SubmitButton />
        </form>
    );
}