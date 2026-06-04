"use client";

import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { MoreVertW700 } from "@material-symbols-svg/react/icons/more-vert";

type HistoryItem = {
    id: string;
    base: string;
    main: string;
    accent: string;
    onDelete: (id: string) => void;
}

export default function GenHistory({
    id,
    base,
    main,
    accent,
    onDelete,
}: HistoryItem) {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(e.target as Node)
            ) {
                setMenuOpen(false);
            }
        };

        window.addEventListener("mousedown", handleClickOutside);
        return () =>
            window.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="group relative flex items-center justify-between p-3 rounded hover:bg-gray-100">
            <Link
                href={`/generate/result?id=${id}`}
                className="flex items-center flex-1 justify-between"
            >
                <div className="flex gap-[6px]">
                    <div
                        className="w-[14px] h-[14px] rounded-full"
                        style={{
                            backgroundColor: base,
                        }}
                    />
                    <div
                        className="w-[14px] h-[14px] rounded-full"
                        style={{
                            backgroundColor: main,
                        }}
                    />
                    <div
                        className="w-[14px] h-[14px] rounded-full"
                        style={{
                            backgroundColor: accent,
                        }}
                    />
                </div>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setMenuOpen((v) => !v);
                    }}
                    className="text-gray-500 opacity-0 group-hover:opacity-100"
                >
                    <MoreVertW700 size={16} />
                </button>

                {menuOpen && (
                    <div
                        ref={menuRef}
                        className="absolute right-2 top-10 bg-white shadow-md rounded px-2 py-1 text-sm z-10"
                    >
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                onDelete(id);
                                setMenuOpen(false);
                            }}
                            className="text-red-500 hover:bg-red-50 px-2 py-1 rounded"
                        >
                            削除
                        </button>
                    </div>
                )}
            </Link>
        </div>
    )
}