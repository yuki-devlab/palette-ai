import { signIn } from "@/lib/auth";

export default function LoginButton() {
    return (
        <form
            action={async () => {
                "use server";
                await signIn("google");
            }}
            className="w-full"
        >
            <button
                type="submit"
                className="bg-sky-500 font-bold py-6 rounded-full [text-box:trim-both_cap_alphabetic] text-sm text-white w-full hover:bg-blue-500"
            >
                ログイン
            </button>
        </form>
    )
}