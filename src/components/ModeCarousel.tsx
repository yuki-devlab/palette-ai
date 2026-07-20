"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import ModeCard from "@/components/ModeCard";

const modeInfoList = [
    {
        id: "random",
        url: "/generate/result",
        title: "おまかせ自動生成",
        description: "おすすめの配色をAIが自動生成します。\n迷っている方はまずこちらから！",
    },
    {
        id: "impression",
        url: "/generate/impression",
        title: "与えたい印象から自動生成",
        description: "ユーザーに与えたい印象を選択すると、おすすめの配色をAIが自動生成します。",
    },
    {
        id: "condition",
        url: "/generate/condition",
        title: "指定した条件から自動生成",
        description: "入力した条件をもとに、おすすめの配色をAIが自動生成します。",
    },
    {
        id: "remaining",
        url: "/generate/remaining",
        title: "決まっている色から残りを自動生成",
        description: "すでに決まっている色を入力すると、残りの色をAIが自動生成します。",
    },
    {
        id: "image",
        url: "/generate/image",
        title: "画像から配色を抽出",
        description: "参考にしたい画像を選択すると、AIが自動で配色を抽出します。",
    },
    {
        id: "website",
        url: "/generate/website",
        title: "Webサイトから配色を抽出",
        description: "参考にしたいWebサイトのURLを入力すると、AIが自動で配色を抽出します。",
    },
] as const;

export default function ModeCarousel() {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [emblaRef, emblaApi] = useEmblaCarousel({
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

        emblaApi.on("select", onSelect);
        onSelect();
    }, [emblaApi, onSelect]);

    return (
        <div
            ref={emblaRef}
            className={`
                overflow-hidden w-full
                lg:w-fit
            `}
        >
            <ul className={`
                flex
                lg:gap-6 lg:grid lg:grid-cols-2 lg:max-w-4xl lg:py-4
            `}>
                {modeInfoList.map((modeInfo, index) => (
                    <ModeCard
                        key={modeInfo.id}
                        modeInfo={modeInfo}
                        isCenter={index === selectedIndex}
                    />
                ))}
            </ul>
        </div>
    );
}