import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, useTranslations } from "next-intl";
import { KeyboardDoubleArrowDown as KeyboardDoubleArrowDownW700 } from "@material-symbols-svg/react/w700";
import { routing } from "@/i18n/routing";
import { createMetadata } from "@/lib/metadata";
import MethodCard from "@/components/MethodCard";

type GenerateMetadataProps = {
    params: Promise<{ locale: string }>;
};

const methodInfoList = [
    {
        id: "auto",
        url: "/generate/auto",
        isRecommended: true,
    },
    {
        id: "impression",
        url: "/generate/impression",
    },
    {
        id: "condition",
        url: "/generate/condition",
    },
    {
        id: "remaining",
        url: "/generate/remaining",
    },
    {
        id: "image",
        url: "/generate/image",
    },
    {
        id: "website",
        url: "/generate/website",
    },
] as const;

export async function generateMetadata({ params }: GenerateMetadataProps): Promise<Metadata> {
    const { locale } = await params;

    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    return createMetadata({
        locale: locale,
        pathname: `/${locale}`,
    });
}

export default function Home() {
    const t = useTranslations("home");

    return (
        <div className="flex flex-col gap-10 items-center justify-center min-h-screen">
            <h1 className="font-bold text-4xl [text-box:trim-both_cap_alphabetic]">
                Palette AI
            </h1>
            <p className="leading-loose [text-box:trim-both_cap_alphabetic] text-center text-slate-500">
                {t("appInfo.description.line1")}
                <br />
                {t("appInfo.description.line2")}
            </p>
            <KeyboardDoubleArrowDownW700
                size={40}
                color="var(--color-sky-500)"
                className="animate-bounce"
            />
            <div className="flex flex-col gap-10">
                <div className="gap-6 grid grid-cols-2">
                    {methodInfoList.map((methodInfo) => (
                        <MethodCard
                            key={methodInfo.id}
                            methodInfo={{
                                id: methodInfo.id,
                                title: t(`methodInfo.${methodInfo.id}.title`),
                                description: t(`methodInfo.${methodInfo.id}.description`),
                                url: methodInfo.url,
                                isRecommended:
                                    "isRecommended" in methodInfo
                                        ? methodInfo.isRecommended
                                        : false,
                            }}
                        />
                    ))}
                </div>
                <button
                    type="button"
                    className="self-end [text-box:trim-both_cap_alphabetic] text-slate-500 text-xs underline underline-offset-[50%] hover:text-slate-800"
                >
                    {t("aboutColors")}
                </button>
            </div>
        </div>
    );
}