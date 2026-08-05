import { Menu } from "@material-symbols-svg/react";

export default function HamburgerMenu() {
    return (
        <button
            type="button"
        >
            <Menu
                size={32}
                color="var(--color-slate-400)"
            />
        </button>
    );
}