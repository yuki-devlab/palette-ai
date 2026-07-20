"use client";

type AppToastProps = {
    title: string | null;
};

export default function AppToast({ title }: AppToastProps) {
    return (
        <div className="bg-slate-800 p-5 rounded text-sm font-bold text-white [text-box:trim-both_cap_alphabetic] shadow-md">
            {title}
        </div>
    );
}