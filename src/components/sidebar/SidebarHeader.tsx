import Link from "next/link";
import Logo from "@/components/Logo";

export default function SidebarHeader() {
    return (
        <header className="flex items-center justify-between">
            <Link
                href="/"
                className="w-10 h-10 flex items-center justify-center"
            >
                <Logo />
            </Link>
        </header>
    );
}