import Link from "next/link";
import { cn } from "@/lib/utils";

type FooterNavProps = {
    category: string;
    links: readonly {
        title: string;
        url: string;
    }[];
};

export default function FooterNav({ category, links }: FooterNavProps) {
    return (
        <nav className="flex flex-col gap-8">
            <h3 className="font-semibold [text-box:trim-both_cap_alphabetic] text-lg text-slate-500">
                {category}
            </h3>
            <ul className="flex flex-col gap-7">
                {links.map((link) => (
                    <li key={link.title}>
                        <Link
                            href={link.url}
                            className={cn(
                                "block text-[15px] [text-box:trim-both_cap_alphabetic] text-slate-500 transition-colors w-fit",
                                "hover:text-slate-800",
                            )}
                        >
                            {link.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}