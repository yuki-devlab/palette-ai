import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";
import GoogleIcon from "@/components/icons/GoogleIcon";

export default function LoginButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className={cn(
                "bg-slate-800 flex gap-2 items-center justify-center py-5 rounded-full w-full",
                "enabled:hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50",
            )}
        >
            {pending ? (
                <div className="animate-spin border-[2.5px] border-white/25 border-t-white h-5 rounded-full w-5" />
            ) : (
                <GoogleIcon className="h-5" />
            )}
            <span className="font-bold [text-box:trim-both_cap_alphabetic] text-white">
                Googleでログイン
            </span>
        </button>
    );
}