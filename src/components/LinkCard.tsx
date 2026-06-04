import Link from "next/link";

type LinkCardProps = {
    url: string;
    title: string;
    description: string;
    badge: string | null;
}

export default function LinkCard({ url, title, description, badge }: LinkCardProps) {
    return (
        <Link href={`/generate/${url}`} className="bg-white flex items-center w-[440px] p-2 rounded-lg shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="bg-sky-200 w-[120px] h-[120px] relative rounded">
                {badge && (
                    <span className="absolute px-2 py-[10px] font-bold text-white bg-[var(--color-blue)] text-[10px] rounded-tl rounded-br [text-box:trim-both_cap_alphabetic]">
                        {badge}
                    </span>
                )}
            </div>
            <div className="flex flex-col gap-6 ml-4 max-w-[280px]">
                <h3 className="font-bold [text-box:trim-both_cap_alphabetic] opacity-90">
                    {title}
                </h3>
                <p className="text-xs text-gray-500 [text-box:trim-both_cap_alphabetic] leading-relaxed whitespace-pre-line">
                    {description.replace(/\\n/g, "\n")}
                </p>
            </div>
        </Link>
    )
}