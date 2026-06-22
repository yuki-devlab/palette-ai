"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { Check as CheckW700 } from "@material-symbols-svg/react/w700";
import { DarkMode as DarkModeW600 } from "@material-symbols-svg/react/w600";
import { LightMode as LightModeW600 } from "@material-symbols-svg/react/w600";

export default function ThemeSelector() {
    const t = useTranslations("sidebar.theme");
    const { theme, resolvedTheme, setTheme } = useTheme();
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const themes = [
        {
            value: "light",
            label: t("light"),
        },
        {
            value: "dark",
            label: t("dark"),
        },
        {
            value: "system",
            label: t("system"),
        },
    ] as const;

    const toggleMenu = () => {
        setMenuIsOpen((prev) => !prev);
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setMenuIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [])

    useEffect(() => {
        setMounted(true);
    }, [])

    if (!mounted) {
        return null;
    }

    const ThemeIcon =
        (theme === "system" ? resolvedTheme : theme) === "light"
            ? LightModeW600
            : DarkModeW600;

    return (
        <div
            ref={menuRef}
            className="relative"
        >
            <button
                className="block"
                onClick={toggleMenu}
            >
                <ThemeIcon
                    size={20}
                    className="text-slate-500 hover:text-slate-800"
                />
            </button>
            <div className={`
                absolute border border-slate-100 mt-3 rounded shadow-lg text-xs transition-all
                ${
                    menuIsOpen
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 pointer-events-none translate-y-4"
                }
            `}>
                {themes.map(({ value, label }) => (
                    <button
                        key={value}
                        className={`
                            flex gap-4 h-12 items-center justify-between px-4 w-full first:rounded-t last:rounded-b
                            ${
                                theme === value
                                    ? "bg-sky-50"
                                    : "bg-white hover:bg-sky-50"
                            }
                        `}
                        onClick={() => {
                            setTheme(value);
                            setMenuIsOpen(false);
                        }}
                    >
                        <span className="[text-box:trim-both_cap_alphabetic] w-max">
                            {label}
                        </span>
                        <span className="flex h-4 items-center justify-center w-4">
                            {theme === value && (
                                <CheckW700
                                    size={16}
                                    color="var(--color-sky-500)"
                                />
                            )}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    )
}