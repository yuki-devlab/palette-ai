import { DatabaseOff } from "@material-symbols-svg/react/w700";

export default function EmptyHistory() {
    return (
        <div className="flex flex-col gap-5 items-center p-5 rounded-[20px] border border-dashed border-slate-300">
            <DatabaseOff
                size={40}
                color="var(--color-slate-400)"
            />
            <p className="leading-normal text-[13px] [text-box:trim-both_cap_alphabetic] text-slate-500">
                まだ生成履歴がありません。
                <br />
                ログインして、生成履歴を保存してみましょう！
            </p>
        </div>
    );
}