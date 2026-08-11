import React, { useId } from "react";
import { cn } from "@/lib/utils";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    required?: boolean;
    label: string;
}

export default function FormInput({ required, label, ...props }: FormInputProps) {
    const inputId = useId();
    
    return (
        <div className="flex flex-col gap-4">
            <label
                htmlFor={inputId}
                className="flex gap-1"
            >
                <span className="font-bold [text-box:trim-both_cap_alphabetic]">
                    {label}
                </span>
                {required && (
                    <span className="font-bold [text-box:trim-both_cap_alphabetic] text-red-500">
                        *
                    </span>
                )}
            </label>
            <input
                {...props}
                id={inputId}
                required={required}
                className={cn(
                    "bg-white border border-slate-300 h-13 px-4 rounded-xl [text-box:trim-both_text] text-sm",
                    "focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/25",
                )}
            />
        </div>
    );
}