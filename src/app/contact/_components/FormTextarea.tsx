import React, { useId } from "react";
import { cn } from "@/lib/utils";

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    required?: boolean;
    label: string;
}

export default function FormTextarea({ required, label, ...props }: FormTextareaProps) {
    const textareaId = useId();

    return (
        <div className="flex flex-col gap-4">
            <label
                htmlFor={textareaId}
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
            <textarea
                {...props}
                id={textareaId}
                required={required}
                className={cn(
                    "bg-white border border-slate-300 field-sizing-content min-h-40 p-4 rounded-xl [text-box:trim-both_text] text-sm",
                    "focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/25",
                )}
            />
        </div>
    );
}