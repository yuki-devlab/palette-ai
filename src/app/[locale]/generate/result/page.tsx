"use client";

import { useEffect, useRef, useState } from "react";
import { notFound, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { generateColor } from "@/actions/generate-color";
import { getHistory } from "@/actions/get-history";
import ResultContent from "@/components/result/ResultContent";
import ResultHeader from "@/components/result/ResultHeader";

type ColorSchemeProps = {
    baseColor: string;
    mainColor: string;
    accentColor: string;
};

type LockColorProps = {
    base: boolean;
    main: boolean;
    accent: boolean;
};

export type StatusProps =
    | "generating"
    | "regenerating"
    | "success"
    | "generate-error"
    | "fetch-error";

export default function ResultPage() {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    const { status: authStatus } = useSession();
    const isLogin = authStatus === "authenticated";

    const [colorScheme, setColorScheme] = useState<ColorSchemeProps | null>(null);
    const [mode, setMode] = useState<string | null>(null);
    const [status, setStatus] = useState<StatusProps>("generating");

    const hasStarted = useRef(false);

    useEffect(() => {
        if (!id) return;

        if (hasStarted.current) return;

        const execute = async () => {
            const pending = sessionStorage.getItem("generatedColors");

            if (pending) {
                const { id: pendingId, mode: pendingMode } = JSON.parse(pending);

                if (pendingId === id) {
                    hasStarted.current = true;
                    sessionStorage.removeItem("generatedColors");
                    setMode(pendingMode);

                    try {
                        const result = await generateColor({
                            historyId: id,
                            mode: pendingMode,
                        });

                        setColorScheme(result);
                        setStatus("success");
                    } catch (error) {
                        setStatus("generate-error");
                    }

                    return;
                }
            }

            try {
                const history = await getHistory(id);

                if (history) {
                    setMode(history.mode);
                    setColorScheme({
                        baseColor: history.baseColor,
                        mainColor: history.mainColor,
                        accentColor: history.accentColor,
                    });
                    setStatus("success");
                }
            } catch (error) {
                setStatus("fetch-error");
            }
        };

        execute();
    }, [id]);

    const handleRegenerate = async (locked: LockColorProps) => {
        setStatus("regenerating");

        try {
            const result = await generateColor({
                historyId: id!,
                mode: mode!,
                lockedColors: {
                    base: locked.base ? colorScheme?.baseColor : null,
                    main: locked.main ? colorScheme?.mainColor : null,
                    accent: locked.accent ? colorScheme?.accentColor : null,
                }
            });

            setColorScheme(result);
            setStatus("success");
        } catch (error) {
            setStatus("generate-error");
        }
    };

    if (!id) {
        notFound();
    }

    return (
        <div className="flex flex-col gap-6 justify-center min-h-screen mx-auto w-fit">
            <ResultHeader
                mode={mode}
                status={status}
                isLogin={isLogin}
            />
            <ResultContent
                colorScheme={colorScheme}
                onRegenerate={handleRegenerate}
                isRegenerating={status === "regenerating"}
                isLoading={status === "generating" || status === "regenerating"}
            />
        </div>
    );
}