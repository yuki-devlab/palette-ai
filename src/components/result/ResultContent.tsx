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
};

export default function ResultContent({ colorScheme, onRegenerate, isRegenerating, isLoading }: ResultContentProps) {
    return (
        <div className="bg-white flex gap-10 px-10 py-14 rounded-2xl shadow">
            <ResultPalette
                colorScheme={colorScheme}
                onRegenerate={onRegenerate}
                isRegenerating={isRegenerating}
                isLoading={isLoading}
            />
            <div
                style={{
                    backgroundImage: "linear-gradient(to bottom, #e2e8f0 50%, rgba(255, 255, 255, 0) 0%)",
                    backgroundSize: "1px 12px",
                    backgroundRepeat: "repeat-y",
                }}
                className="w-px"
            />
            <ResultPreview />
        </div>
    );
}