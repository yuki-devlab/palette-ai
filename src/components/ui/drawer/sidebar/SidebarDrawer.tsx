"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

type SidebarDrawerPropsProps = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
};

export default function SidebarDrawer({ isOpen, onClose, children }: SidebarDrawerPropsProps) {
    const [mounted, setMounted] = useState(false);
    const [isRendered, setIsRendered] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (isOpen) {
            setIsRendered(true);
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 10);

            return () => clearTimeout(timer);
        } else {
            setIsVisible(false);
            const timer = setTimeout(() => {
                setIsRendered(false);
            }, 150);

            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            document.documentElement.style.overflow = "hidden";

            return () => {
                document.body.style.overflow = "";
                document.documentElement.style.overflow = "";
            };
        }
    }, [isOpen]);

    if (!mounted || !isRendered) {
        return null;
    }

    const portal = document.getElementById("portal");

    if (!portal) {
        return null;
    }

    return createPortal(
        <div className={cn(
            "fixed flex inset-0 p-5",
            isVisible ? "pointer-events-auto" : "pointer-events-none",
            "md:px-0",
        )}>
            <div
                className={cn(
                    "backdrop-blur-md bg-slate-500/25 fixed inset-0 transition-all",
                    isVisible ? "opacity-100" : "opacity-0",
                )}
                onClick={onClose}
            />
            <div className={cn(
                "absolute top-0 left-0 h-full p-5 md:p-0 transition-transform",
                isVisible ? "translate-x-0" : "-translate-x-full",
            )}>
                {children}
            </div>
        </div>,
        portal,
    );
}