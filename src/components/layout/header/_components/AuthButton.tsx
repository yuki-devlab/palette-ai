import type { Session } from "next-auth";
import AccountSettingsButton from "@/components/layout/header/_components/AccountSettingsButton";
import LoginButton from "@/components/layout/header/_components/LoginButton";

type AuthButtonProps = {
    user?: Session["user"];
    isPro: boolean;
};

export default function AuthButton({ user, isPro }: AuthButtonProps) {
    return (
        <>
            {user ? (
                <AccountSettingsButton
                    user={user}
                    isPro={isPro}
                />
            ) : (
                <LoginButton />
            )}
        </>
    );
}