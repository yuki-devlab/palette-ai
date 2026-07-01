import { auth } from "@/lib/auth";
import AccountSummary from "@/components/AccountSummary";
import SidebarLoginButton from "@/components/login-button/SidebarLoginButton";

export default async function SidebarFooter() {
    const session = await auth();

    return (
        <>
            {session?.user ? <AccountSummary /> : <SidebarLoginButton />}
        </>
    );
}