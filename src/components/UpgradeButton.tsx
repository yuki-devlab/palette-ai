import { useTranslations } from "next-intl";

export default function UpgradeButton() {
    const t = useTranslations("sidebar");

    return (
        <button
            type="button"
            className="bg-sky-500 font-bold p-3 rounded-full [text-box:trim-both_cap_alphabetic] text-white text-xs hover:bg-blue-500"
        >
            {t("upgrade")}
        </button>
    );
}