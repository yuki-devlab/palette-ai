import { Suspense } from "react";
import { Link } from "@/i18n/navigation";
import LanguageSelector from "@/components/LanguageSelector";
import ThemeSelector from "@/components/ThemeSelector";

export default function SidebarHeader() {
    return (
        <header className="flex items-center justify-between">
            <Link href="/">
                {/* <Logo /> */}
            </Link>
            <div className="flex gap-4 items-center">
                <ThemeSelector />
                <Suspense fallback={null}>
                    <LanguageSelector />
                </Suspense>
            </div>
        </header>
    );
}