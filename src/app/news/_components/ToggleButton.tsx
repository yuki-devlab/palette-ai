"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Category } from "@/types/news";
import { cn } from "@/lib/utils";

type ToggleButtonProps = {
    categories: Category[];
    currentCategoryId?: string;
};

export default function ToggleButton({ categories, currentCategoryId = "" }: ToggleButtonProps) {
    const buttonRef = useRef<{ [key: string]: HTMLButtonElement | null }>({});
    const [indicatorStyle, setIndicatorStyle] = useState({
        left: 0,
        width: 0,
    });
    const router = useRouter();
    const searchParams = useSearchParams();

    const allCategories = [
        {
            id: "",
            name: "すべて",
        },
        ...categories,
    ];

    useEffect(() => {
        const activeElement = buttonRef.current[currentCategoryId];

        if (activeElement) {
            setIndicatorStyle({
                left: activeElement.offsetLeft,
                width: activeElement.offsetWidth,
            });
        }
    }, [categories, currentCategoryId]);

    const handleCategoryChange = (categoryId: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (categoryId) {
            params.set("category", categoryId);
        } else {
            params.delete("category");
        }

        router.push(`/news?${params.toString()}`);
    };

    return (
        <div className="bg-slate-200 flex p-1 relative rounded-full">
            <div
                className="absolute bg-white h-10 rounded-full transition-all"
                style={{
                    left: `${indicatorStyle.left}px`,
                    width: `${indicatorStyle.width}px`,
                }}
            />
            {allCategories.map((category) => {
                const isActive = currentCategoryId === category.id;

                return (
                    <button
                        key={category.id || "all"}
                        type="button"
                        onClick={() => handleCategoryChange(category.id)}
                        ref={(el) => {
                            buttonRef.current[category.id] = el;
                        }}
                        className={cn(
                            "font-semibold h-10 px-4 relative rounded-full [text-box:trim-both_cap_alphabetic] transition-colors",
                            isActive
                                ? "text-slate-800"
                                : "text-slate-500 hover:text-slate-600",
                        )}
                    >
                        {category.name}
                    </button>
                );
            })}
        </div>
    );
}