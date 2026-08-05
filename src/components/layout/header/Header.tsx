import Link from "next/link";
import { auth } from "@/lib/auth";
import { cn } from "@/lib/utils";
import AuthButton from "@/components/layout/header/_components/AuthButton";
import HamburgerMenu from "@/components/layout/header/_components/HamburgerMenu";

export default async function Header() {
    const session = await auth();

    return (
        <header className={cn(
            "bg-white flex items-center justify-between px-4 py-2.5 relative rounded-[20px] shadow-sm w-full",
            "md:w-lg",
            "lg:hidden",
        )}>
            <HamburgerMenu />
            <Link
                href="/"
                className="absolute left-1/2 -translate-x-1/2"
            >
                <div className="w-10 h-10 rounded-lg bg-slate-300" />
            </Link>
            <AuthButton user={session?.user} />
        </header>
    );
}