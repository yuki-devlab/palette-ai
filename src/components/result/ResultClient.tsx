"use client";

import { useEffect, useRef, useState } from "react";
import { notFound, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
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

export default function ResultClient() {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    const { status: authStatus } = useSession();
    const isLogin = authStatus === "authenticated";

    const [colorScheme, setColorScheme] = useState<ColorSchemeProps | null>(null);
    const [mode, setMode] = useState<string | null>(null);
    const [status, setStatus] = useState<StatusProps>("generating");
    const [isNotFound, setIsNotFound] = useState(false);
    const [params, setParams] = useState<any>(null);
    const [initialLocked, setInitialLocked] = useState<LockColorProps>({ base: false, main: false, accent: false });

    const hasStarted = useRef(false);

    useEffect(() => {
        if (!id) return;

        if (hasStarted.current) return;

        const execute = async () => {
            const pending = sessionStorage.getItem("generated-colors");

            if (pending) {
                const { id: pendingId, mode: pendingMode, params: pendingParams, lockedColors: pendingLockedColors } = JSON.parse(pending);

                if (pendingId === id) {
                    hasStarted.current = true;
                    sessionStorage.removeItem("generated-colors");
                    setMode(pendingMode);
                    setParams(pendingParams || null);

                    if (pendingLockedColors) {
                        setInitialLocked({
                            base: !!pendingLockedColors.base,
                            main: !!pendingLockedColors.main,
                            accent: !!pendingLockedColors.accent,
                        });

                        setColorScheme({
                            baseColor: pendingLockedColors.base || "",
                            mainColor: pendingLockedColors.main || "",
                            accentColor: pendingLockedColors.accent || "",
                        });
                    }

                    try {
                        const result = await generateColor({
                            historyId: id,
                            mode: pendingMode,
                            params: pendingParams,
                            lockedColors: pendingLockedColors,
                        });

                        setColorScheme(result as ColorSchemeProps);
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
                } else {
                    setIsNotFound(true);
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
                mode: mode as any,
                params: params,
                lockedColors: {
                    base: locked.base ? colorScheme?.baseColor : null,
                    main: locked.main ? colorScheme?.mainColor : null,
                    accent: locked.accent ? colorScheme?.accentColor : null,
                }
            });

            if (result && "success" in result && result.success === false) {
                throw new Error(result.errorType);
            }

            setColorScheme(result as ColorSchemeProps);
            setStatus("success");
        } catch (error) {
            setStatus("generate-error");
        }
    };

    if (isNotFound) {
        notFound();
    }

    return (
        <div className={cn(
            "flex flex-col gap-6 justify-center mx-auto w-full max-w-5xl px-4",
            "md:px-10",
        )}>
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
                initialLocked={initialLocked}
            />
        </div>
    );
}