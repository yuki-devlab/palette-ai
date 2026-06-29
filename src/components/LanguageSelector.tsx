"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";
import { Check as CheckW700 } from "@material-symbols-svg/react/w700";
import { KeyboardArrowDown } from "@material-symbols-svg/react";
import { Link, usePathname } from "@/i18n/routing";

const locales = [
    {
        code: "ja",
        label: "日本語",
    },
    {
        code: "en",
        label: "English",
    },
] as const;

export default function LanguageSelector() {
    const locale = useLocale();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const query = Object.fromEntries(searchParams.entries());

    const toggleMenu = () => {
        setMenuIsOpen((prev) => !prev);
    };

    useEffect(() => {
        if (!menuIsOpen) {
            return;
        }

        const handlePointerDown = (event: PointerEvent) => {
            if (
                event.target instanceof Node &&
                !menuRef.current?.contains(event.target)
            ) {
                setMenuIsOpen(false);
            }
        };

        document.addEventListener("pointerdown", handlePointerDown);

        return () => {
            document.removeEventListener("pointerdown", handlePointerDown);
        };
    }, [menuIsOpen]);

    return (
        <div
            ref={menuRef}
            className="relative"
        >
            <button
                type="button"
                onClick={toggleMenu}
                className="flex gap-1 items-center text-slate-500 hover:text-slate-800"
            >
                <span className="[text-box:trim-both_cap_alphabetic] text-sm">
                    {locale.toUpperCase()}
                </span>
                <KeyboardArrowDown size={20} />
            </button>
            <div
                className={`
                    absolute border border-slate-100 mt-3 rounded shadow-lg text-xs transition-all
                    ${
                        menuIsOpen
                            ? "opacity-100 pointer-events-auto translate-y-0"
                            : "opacity-0 pointer-events-none translate-y-4"
                    }
                `}
            >
                {locales.map(({ code, label }) => (
                    <Link
                        key={code}
                        locale={code}
                        href={{
                            pathname,
                            query,
                        }}
                        className={`
                            flex gap-4 h-12 items-center justify-between px-4 first:rounded-t last:rounded-b
                            ${
                                locale === code
                                    ? "bg-sky-50"
                                    : "bg-white hover:bg-sky-50"
                            }
                        `}
                    >
                        <span className="[text-box:trim-both_cap_alphabetic] w-max">
                            {label}
                        </span>
                        <span className="flex h-4 items-center justify-center w-4">
                            {locale === code && (
                                <CheckW700
                                    size={16}
                                    color="var(--color-sky-500)"
                                />
                            )}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    );
}