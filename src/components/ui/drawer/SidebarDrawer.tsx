import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Close } from "@material-symbols-svg/react/w700";
import { cn } from "@/lib/utils";

type SidebarDrawerProps = {
    isOpen: boolean;
    onClose: () => void;
};

export default function SidebarDrawer({ isOpen, onClose }: SidebarDrawerProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    if (!mounted) {
        return null;
    }

    const portal = document.getElementById("portal");

    if (!portal) {
        return null;
    }

    return createPortal(
        <div className={cn(
            "fixed flex inset-0 items-center justify-center px-5",
            isOpen ? "pointer-events-auto" : "pointer-events-none",
            "md:p-0",
        )}>
            <div
                className={cn(
                    "backdrop-blur-md bg-slate-500/25 fixed inset-0",
                    isOpen ? "opacity-100" : "opacity-0",
                )}
                onClick={onClose}
            >
                
            </div>
            
        </div>,
        portal,
    );
}