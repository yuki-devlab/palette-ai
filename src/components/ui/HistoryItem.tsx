"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { Delete } from "@material-symbols-svg/react";
import { MoreVert as MoreVertW700 } from "@material-symbols-svg/react/w700";
import { deleteHistory } from "@/actions/delete-history";
import Link from "next/link";

type HistoryItemProps = {
    id: string;
    baseColor: string;
    mainColor: string;
    accentColor: string;
};

export default function HistoryItem({ id, baseColor, mainColor, accentColor }: HistoryItemProps) {
    const menuRef = useRef<HTMLLIElement>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isPending, startTransition] = useTransition();

    const searchParams = useSearchParams();
    const currentId = searchParams.get("id");
    const isActive = currentId === id;

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    const handleDelete = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        startTransition(async () => {
            try {
                await deleteHistory(id);
            } catch (error) {
                console.error("削除に失敗しました", error);
                setIsMenuOpen(false);
            }
        });
    };

    useEffect(() => {
        if (!isMenuOpen) {
            return;
        }

        const handlePointerDown = (event: PointerEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener("pointerdown", handlePointerDown);

        return () => {
            document.removeEventListener("pointerdown", handlePointerDown);
        };
    }, [isMenuOpen]);

    return (
        <li
            ref={menuRef}
            className="relative"
        >
            <Link
                href={`/generate/result?id=${id}`}
                className={`
                    flex group items-center justify-between pl-4 pr-1.5 py-3 rounded-md
                    ${isActive ? "bg-slate-100" : ""}
                    ${isMenuOpen ? "pointer-events-none" : "hover:bg-slate-100"}
                `}
            >
                <div className="flex gap-1">
                    <span
                        style={{ backgroundColor: baseColor }}
                        className="border border-slate-300 h-4 rounded-full w-4"
                    />
                    <span
                        style={{ backgroundColor: mainColor }}
                        className="border border-slate-300 h-4 rounded-full w-4"
                    />
                    <span
                        style={{ backgroundColor: accentColor }}
                        className="border border-slate-300 h-4 rounded-full w-4"
                    />
                </div>
                <button
                    type="button"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleMenu();
                    }}
                    className={`
                        pointer-events-auto
                        ${isMenuOpen ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
                    `}
                >
                    <MoreVertW700
                        size={20}
                        color="var(--color-slate-400)"
                    />
                </button>
            </Link>
            {isMenuOpen && (
                <button
                    type="button"
                    onClick={handleDelete}
                    disabled={isPending}
                    className="absolute bg-white border border-slate-100 flex gap-2 h-12 items-center px-4 right-0 rounded-md shadow-lg text-slate-500 top-full z-10 hover:bg-slate-100"
                >
                    {isPending ? (
                        <div className="animate-spin border-2 border-t-slate-500 border-slate-500/25 h-4 rounded-full w-4" />
                    ) : (
                        <Delete size={20} />
                    )}
                    <span className="[text-box:trim-both_cap_alphabetic] text-sm">
                        {isPending ? "削除中…" : "削除する"}
                    </span>
                </button>
            )}
        </li>
    );
}