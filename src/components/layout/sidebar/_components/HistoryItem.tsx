"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Delete } from "@material-symbols-svg/react";
import { MoreVert } from "@material-symbols-svg/react/w700";
import { cn } from "@/lib/utils";
import { deleteHistory } from "@/actions/delete-history";

type HistoryItemProps = {
    id: string;
    baseColor: string;
    mainColor: string;
    accentColor: string;
};

export default function HistoryItem({ id, baseColor, mainColor, accentColor }: HistoryItemProps) {
    const menuRef = useRef<HTMLLIElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const linkRef = useRef<HTMLAnchorElement>(null);
    const portalMenuRef = useRef<HTMLDivElement>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ top: 0, right: 0 });

    const [isDeleted, setIsDeleted] = useState(false);
    const [isPending, startTransition] = useTransition();

    const searchParams = useSearchParams();
    const currentId = searchParams.get("id");
    const isActive = currentId === id;

    const toggleMenu = () => {
        if (!isMenuOpen && buttonRef.current) {
            const buttonRect = buttonRef.current.getBoundingClientRect();
            const linkRect = linkRef.current?.getBoundingClientRect();

            setMenuPosition({
                top: buttonRect.bottom + 14,
                right: window.innerWidth - (linkRect?.right ?? buttonRect.right),
            });
        }

        setIsMenuOpen((prev) => !prev);
    };

    const handleDelete = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        setIsDeleted(true);

        startTransition(async () => {
            try {
                await deleteHistory({ historyId: id });
            } catch (error) {
                console.error("削除に失敗しました", error);
                setIsDeleted(false);
                setIsMenuOpen(false);
            }
        });
    };

    useEffect(() => {
        if (!isMenuOpen) {
            return;
        }

        const handlePointerDown = (event: PointerEvent) => {
            const target = event.target as Node;
            const isInsideMenu = menuRef.current?.contains(target);
            const isInsidePortal = portalMenuRef.current?.contains(target);

            if (!isInsideMenu && !isInsidePortal) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener("pointerdown", handlePointerDown);

        return () => {
            document.removeEventListener("pointerdown", handlePointerDown);
        };
    }, [isMenuOpen]);

    if (isDeleted) {
        return null;
    }

    return (
        <li
            ref={menuRef}
            className="relative flex group items-center"
        >
            <Link
                href={`/generate/result?id=${id}`}
                ref={linkRef}
                className={cn(
                    "flex flex-1 px-5 items-center h-12 rounded-lg transition-colors",
                    isActive ? "bg-slate-100" : "",
                    isMenuOpen ? "pointer-events-none" : "hover:bg-slate-100",
                )}
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
            </Link>
            <div className="absolute right-3 flex items-center justify-center">
                <button
                    type="button"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleMenu();
                    }}
                    disabled={isPending}
                    ref={buttonRef}
                    className={cn(
                        "pointer-events-auto transition-opacity",
                        isMenuOpen ? "opacity-100" : "opacity-0 group-hover:opacity-100",
                    )}
                >
                    <MoreVert
                        size={20}
                        color="var(--color-slate-400)"
                    />
                </button>
            </div>
            {isMenuOpen &&
                createPortal(
                    <div
                        ref={portalMenuRef}
                        style={{
                            top: `${menuPosition.top}px`,
                            right: `${menuPosition.right}px`,
                        }}
                        className="fixed bg-white shadow-lg p-1 rounded-[20px] top-full right-0 z-10 border border-slate-100"
                    >
                        <button
                            type="button"
                            onClick={handleDelete}
                            disabled={isPending}
                            className={cn(
                                "flex gap-1 items-center px-4 py-2.5 rounded-xl text-slate-500 transition-colors",
                                "hover:bg-slate-100",
                            )}
                        >
                            <Delete size={20} />
                            <span className="[text-box:trim-both_cap_alphabetic] text-[15px]">
                                削除する
                            </span>
                        </button>
                    </div>,
                    document.body,
                )}
        </li>
    );
}