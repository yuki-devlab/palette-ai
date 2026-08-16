"use client";

import { useState } from "react";
import { Menu } from "@material-symbols-svg/react/w700";
import SidebarDrawer from "@/components/ui/drawer/sidebar/SidebarDrawer";

type HamburgerMenuProps = {
    children: React.ReactNode;
};

export default function HamburgerMenu({ children }: HamburgerMenuProps) {
    const [isOpen, setIsOpen] = useState(false);

    const openDrawer = () => {
        setIsOpen(true);
    };

    const closeDrawer = () => {
        setIsOpen(false);
    };

    return (
        <>
            <button
                type="button"
                onClick={openDrawer}
            >
                <Menu
                    size={32}
                    color="var(--color-slate-400)"
                />
            </button>
            <SidebarDrawer
                isOpen={isOpen}
                onClose={closeDrawer}
            >
                {children}
            </SidebarDrawer>
        </>
    );
}