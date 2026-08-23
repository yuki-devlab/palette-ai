import { cn } from "@/lib/utils";
import ResultPalette from "@/components/result/ResultPalette";
import ResultPreview from "@/components/result/ResultPreview";

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

type ResultContentProps = {
    colorScheme: ColorSchemeProps | null;
    onRegenerate: (locked: LockColorProps) => void;
    isRegenerating: boolean;
    isLoading: boolean;
    initialLocked: LockColorProps;
};

export default function ResultContent({ colorScheme, onRegenerate, isRegenerating, isLoading, initialLocked }: ResultContentProps) {
    return (
        <div className={cn(
            "bg-white flex gap-10 px-6 py-10 rounded-2xl shadow flex-col w-full",
            "lg:flex-row lg:min-w-0 lg:p-10",
        )}>
            <ResultPalette
                colorScheme={colorScheme}
                onRegenerate={onRegenerate}
                isRegenerating={isRegenerating}
                isLoading={isLoading}
                initialLocked={initialLocked}
            />
            <div
                style={{
                    backgroundImage: "linear-gradient(to bottom, #e2e8f0 50%, rgba(255, 255, 255, 0) 0%)",
                    backgroundSize: "1px 12px",
                    backgroundRepeat: "repeat-y",
                }}
                className="w-px"
            />
            <ResultPreview
                colorScheme={colorScheme}
            />
        </div>
    );
}