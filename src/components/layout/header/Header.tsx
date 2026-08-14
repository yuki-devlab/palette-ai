import Link from "next/link";
import { auth } from "@/lib/auth";
import { getSubscriptionStatus } from "@/lib/subscription-status";
import { cn } from "@/lib/utils";
import AuthButton from "@/components/layout/header/_components/AuthButton";
import HamburgerMenu from "@/components/layout/header/_components/HamburgerMenu";

export default async function Header() {
    const session = await auth();
    const { isPro } = await getSubscriptionStatus();

    return (
        <header className={cn(
            "bg-white flex items-center justify-between px-4 py-3 rounded-3xl shadow-sm w-full",
            "md:w-lg",
        )}>
            <HamburgerMenu />
            <Link
                href="/"
                className="absolute left-1/2 -translate-x-1/2"
            >
                <div className="w-10 h-10 rounded-lg bg-[#D9D9D9]" />
            </Link>
            <AuthButton
                user={session?.user}
                isPro={isPro}
            />
        </header>
    );
}