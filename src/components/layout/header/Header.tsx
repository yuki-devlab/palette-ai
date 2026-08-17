import Link from "next/link";
import { auth } from "@/lib/auth";
import { getSubscriptionStatus } from "@/lib/subscription-status";
import { cn } from "@/lib/utils";
import AuthButton from "@/components/layout/header/_components/AuthButton";
import HamburgerMenu from "@/components/layout/header/_components/HamburgerMenu";
import Sidebar from "@/components/layout/sidebar/Sidebar";
import { Symbol } from "@/components/Logo";

export default async function Header() {
    const session = await auth();
    const { isPro } = await getSubscriptionStatus();

    return (
        <header className={cn(
            "bg-white flex items-center justify-between px-4 py-3 rounded-3xl shadow-sm w-full",
            "md:w-lg",
        )}>
            <HamburgerMenu>
                <Sidebar className={cn(
                    "flex flex-col gap-6 h-full rounded-3xl shadow-2xl",
                    "lg:hidden",
                )} />
            </HamburgerMenu>
            <Link
                href="/"
                className="absolute left-1/2 -translate-x-1/2"
            >
                <Symbol className="h-10" />
            </Link>
            <AuthButton
                user={session?.user}
                isPro={isPro}
            />
        </header>
    );
}