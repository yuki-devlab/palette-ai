import { Menu } from "@material-symbols-svg/react";
import { cn } from "@/lib/utils";

export default function HamburgerMenu() {
    return (
        <button
            type="button"
        >
            <Menu
                color="var(--color-slate-400)"
                className={cn(
                    "h-7 w-7",
                    "md:h-8 md:w-8",
                )}
            />
        </button>
    );
}