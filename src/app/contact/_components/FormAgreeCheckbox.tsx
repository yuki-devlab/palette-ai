import React, { useId } from "react";
import { Check } from "@material-symbols-svg/react/w700";
import { cn } from "@/lib/utils";

interface FormAgreeCheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: React.ReactNode;
}

export default function FormAgreeCheckbox({ label, ...props }: FormAgreeCheckboxProps) {
    const checkboxId = useId();

    return (
        <div className="flex gap-2 items-center">
            <div className="flex items-center justify-center relative">
                <input
                    {...props}
                    type="checkbox"
                    id={checkboxId}
                    required
                    className={cn(
                        "appearance-none bg-white border border-slate-300 cursor-pointer h-4 peer rounded w-4",
                        "checked:bg-sky-500 checked:border-none",
                    )}
                />
                <Check
                    size={16}
                    color="var(--color-white)"
                    className={cn(
                        "absolute hidden pointer-events-none",
                        "peer-checked:block",
                    )}
                />
            </div>
            <label
                htmlFor={checkboxId}
                className="cursor-pointer [text-box:trim-both_cap_alphabetic] text-sm"
            >
                {label}
            </label>
        </div>
    );
}