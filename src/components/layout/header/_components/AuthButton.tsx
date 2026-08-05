import type { Session } from "next-auth";
import { getSubscriptionStatus } from "@/lib/subscription-status";
import LoginButton from "@/components/layout/header/_components/LoginButton";
import ProfileButton from "@/components/layout/header/_components/ProfileButton";

type AuthButtonProps = {
    user?: Session["user"];
};

export default async function AuthButton({ user }: AuthButtonProps) {
    const { isPro } = await getSubscriptionStatus();

    return (
        <>
            {user ? (
                <ProfileButton
                    user={user}
                    isPro={isPro}
                />
            ) : (
                <LoginButton />
            )}
        </>
    );
}