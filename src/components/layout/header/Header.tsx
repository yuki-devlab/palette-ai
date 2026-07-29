import Link from "next/link";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { cn } from "@/lib/utils";
import HamburgerMenu from "@/components/layout/header/_components/HamburgerMenu";
import LoginButton from "@/components/layout/header/_components/LoginButton";
import ProfileButton from "@/components/layout/header/_components/ProfileButton";

export default async function Header() {
    const session = await auth();
    let isPro = false;

    if (session?.user.id) {
        const subscription = await prisma.subscription.findUnique({
            where: {
                userId: session?.user.id,
            },
            select: {
                currentPeriodEnd: true,
            },
        });

        isPro =
            !!subscription?.currentPeriodEnd &&
            subscription.currentPeriodEnd > new Date();
    }

    return (
        <header className={cn(
            "bg-white flex h-14 items-center justify-between px-4 relative rounded-2xl shadow",
            "md:mx-auto md:w-lg",
            "lg:hidden",
        )}>
            <HamburgerMenu />
            <Link
                href="/"
                className="absolute left-1/2 -translate-x-1/2"
            >
                <div className="w-9 h-9 rounded bg-[#D9D9D9]" />
            </Link>
            {session?.user ? (
                <ProfileButton
                    user={session.user}
                    isPro={isPro}
                />
            ) : (
                <LoginButton />
            )}
        </header>
    );
}