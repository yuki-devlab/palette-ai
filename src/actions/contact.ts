"use server";

import { redirect } from "next/navigation";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export type FormState = {
    success: boolean;
    message: string;
} | null;

export async function submitContact(
    _prevState: FormState,
    formData: FormData
) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const content = formData.get("content") as string;
    const turnstileToken = formData.get("cf-turnstile-response") as string;

    if (!turnstileToken) {
        return { success: false, message: "Turnstile認証を完了してください。" };
    }

    const verifyRes = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                secret: process.env.TURNSTILE_SECRET_KEY!,
                response: turnstileToken,
            }),
        }
    );
    const verifyData = await verifyRes.json();

    if (!verifyData.success) {
        return { success: false, message: "Bot認証に失敗しました。再度お試しください。" };
    }

    try {
        await resend.emails.send({
            from: "Palette AI <noreply@palette-ai.jp>",
            to: process.env.ADMIN_EMAIL!,
            subject: `【お問い合わせ】${name}様よりメッセージ`,
            text: `以下のアカウントからお問い合わせが届きました。\n\nお名前: ${name}\nメールアドレス: ${email}\n\n【内容】\n${content}`,
        });

        await resend.emails.send({
            from: "Palette AI <noreply@palette-ai.jp>",
            to: email,
            subject: "【Palette AI】お問い合わせを受け付けました",
            text: `${name} 様\n\nお問い合わせいただき、ありがとうございます。\n内容を確認のうえ、担当者よりご連絡いたします。\n\nーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー\n\n${content}\n\nーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー`,
        });
    } catch (error) {
        console.error(error);
        return { success: false, message: "送信中にエラーが発生しました。" };
    }

    redirect("/contact/thankyou");
}