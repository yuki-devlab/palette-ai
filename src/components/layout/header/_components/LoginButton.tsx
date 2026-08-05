import { cn } from "@/lib/utils";

export default function LoginButton() {
    return (
        <button
            type="button"
            className={cn(
                "bg-slate-100 font-bold h-10 px-4 rounded-xl text-sm",
                "hover:bg-slate-200",
            )}
        >
            ログイン
        </button>
    );
}