"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { cn } from "@/lib/utils";
import ModeCard from "@/components/ui/ModeCard";

const MODE_INFO_LIST = [
    {
        id: "auto",
        title: "おまかせ自動生成",
        description: "おすすめの配色をAIが自動生成します。\n迷っている方はまずこちらから！",
    },
    {
        id: "impression",
        title: "与えたい印象から自動生成",
        description: "ユーザーに与えたい印象を選択すると、おすすめの配色をAIが自動生成します。",
    },
    {
        id: "condition",
        title: "指定した条件から自動生成",
        description: "入力した条件をもとに、おすすめの配色をAIが自動生成します。",
    },
    {
        id: "remaining",
        title: "決まっている色から残りを自動生成",
        description: "すでに決まっている色を入力すると、残りの色をAIが自動生成します。",
    },
] as const;

export default function GenerationMenu() {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: "center",
        breakpoints: {
            "(min-width: 1024px)": {
                active: false,
            },
        },
        loop: true,
    });

    const onSelect = useCallback(() => {
        if (!emblaApi) return;

        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;

        onSelect();
        emblaApi.on("select", onSelect);
        emblaApi.on("reInit", onSelect);
    }, [emblaApi, onSelect]);

    return (
        <div
            ref={emblaRef}
            className={cn(
                "overflow-hidden",
                "lg:overflow-visible lg:px-8",
                "xl:px-0",
            )}
        >
            <div className={cn(
                "flex items-center max-w-screen",
                "lg:gap-5 lg:grid lg:grid-cols-2",
            )}>
                {MODE_INFO_LIST.map((modeInfo, index) => (
                    <div
                        key={modeInfo.id}
                        className={cn(
                            "min-w-0 shrink-0 grow-0 px-2 basis-[90%]",
                            "md:basis-[46%]",
                            "lg:px-0",
                        )}
                    >
                        <ModeCard
                            isSelected={index === selectedIndex}
                            modeInfo={modeInfo}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}