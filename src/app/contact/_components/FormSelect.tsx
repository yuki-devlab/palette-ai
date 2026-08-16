import React, { useId } from "react";
import { cn } from "@/lib/utils";

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    required?: boolean;
    label: string;
}

export default function FormSelect({
    required,
    label,
    ...props
}: FormSelectProps) {
    const selectId = useId();

    return (
        <div className="flex flex-col gap-4">
            <label
                htmlFor={selectId}
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
            <div className="relative">
                <select
                    {...props}
                    id={selectId}
                    required={required}
                    className={cn(
                        "bg-white border border-slate-300 h-13 px-4 rounded-xl w-full",
                    )}
                >
                    <option
                        value=""
                        disabled
                    >
                        選択してください
                    </option>
                </select>
                <div className="w-5 h-5 bg-slate-300"></div>
            </div>
        </div>
    );
}