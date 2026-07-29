"use client";

import { useState } from "react";
import { Menu } from "@material-symbols-svg/react";
import SidebarDrawer from "@/components/ui/drawer/SidebarDrawer";

export default function HamburgerMenu() {
    const [isOpen, setIsOpen] = useState(false);

    const openDrawer = () => {
        setIsOpen(true);
    };

    const closeDrawer = () => {
        setIsOpen(false);
    }

    return (
        <>
            <button
                type="button"
                onClick={openDrawer}
            >
                <Menu
                    size={28}
                    color="var(--color-slate-400)"
                />
            </button>
            <SidebarDrawer
                isOpen={isOpen}
                onClose={closeDrawer}
            />
        </>
    );
}