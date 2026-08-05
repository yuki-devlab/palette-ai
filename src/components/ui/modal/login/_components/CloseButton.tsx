import { Close } from "@material-symbols-svg/react";
import { cn } from "@/lib/utils";

type CloseButtonProps = {
    onClick: () => void;
};

export default function CloseButton({ onClick }: CloseButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
        >
            <Close
                size={28}
                className={cn(
                    "text-slate-400",
                    "hover:text-slate-500",
                )}
            />
        </button>
    );
}