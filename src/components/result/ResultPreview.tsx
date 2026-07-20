type ColorSchemeProps = {
    baseColor: string;
    mainColor: string;
    accentColor: string;
};

type ResultPreviewProps = {
    colorScheme: ColorSchemeProps | null;
};

export default function ResultPreview({ colorScheme }: ResultPreviewProps) {
    return (
        <div
            className={`
                w-full h-125 rounded-md border border-slate-300 overflow-y-auto
                lg:w-md
            `}
            style={{ backgroundColor: colorScheme?.baseColor }}
        >
            <div className="w-full h-8 bg-white flex items-center justify-center">
                <div className="flex items-center justify-between max-w-80 mx-auto w-full">
                    <div
                        className="w-15 h-4"
                        style={{ backgroundColor: colorScheme?.mainColor }}
                    />
                    <div
                        className="w-15 h-4 rounded-full"
                        style={{ backgroundColor: colorScheme?.accentColor }}
                    />
                </div>
            </div>
            <div className="w-full h-65 bg-slate-200 flex flex-col items-center justify-center gap-6">
                <p
                    className="text-[8px] max-w-80 w-full text-center leading-normal"
                    style={{ color: colorScheme?.mainColor }}
                >
                    Palette AIは、ベースカラー・メインカラー・アクセントカラーを自動生成するAIツールです。
                    <br />
                    配色の知識がない方でも、簡単に生成することができます。
                </p>
                <div
                    className="text-[7px] text-white font-bold py-1 px-4 rounded-full"
                    style={{ backgroundColor: colorScheme?.accentColor }}
                >
                    使ってみる
                </div>
            </div>
            <div className="w-full">
                <div className="w-full h-65 max-w-80 grid grid-cols-2 gap-6 items-center justify-center mx-auto py-10">
                    <div className="w-full h-full bg-white shadow"></div>
                    <div className="w-full h-full bg-white shadow"></div>
                    <div className="w-full h-full bg-white shadow"></div>
                    <div className="w-full h-full bg-white shadow"></div>
                </div>
            </div>
            <div className="w-full">
                <div className="w-full h-65 max-w-80 grid grid-cols-2 gap-6 items-center justify-center mx-auto py-10">
                    <div className="w-full h-full bg-white shadow"></div>
                    <div className="w-full h-full bg-white shadow"></div>
                    <div className="w-full h-full bg-white shadow"></div>
                    <div className="w-full h-full bg-white shadow"></div>
                </div>
            </div>
            <div className="w-full">
                <div className="w-full h-65 max-w-80 grid grid-cols-2 gap-6 items-center justify-center mx-auto py-10">
                    <div className="w-full h-full bg-white shadow"></div>
                    <div className="w-full h-full bg-white shadow"></div>
                    <div className="w-full h-full bg-white shadow"></div>
                    <div className="w-full h-full bg-white shadow"></div>
                </div>
            </div>
        </div>
    );
}