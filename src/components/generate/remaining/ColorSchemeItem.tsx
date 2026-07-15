type ColorSchemeItemProps = {
    title: string;
    description: string;
    value: string;
    placeholder: string;
    onChange: (value: string) => void;
};

export default function ColorSchemeItem({ title, description, value, placeholder, onChange }: ColorSchemeItemProps) {
    return (
        <div className="contents">
            <div className="flex flex-col gap-4.5">
                <dt className="font-bold [text-box:trim-both_cap_alphabetic]">
                    {title}
                </dt>
                <dd className="[text-box:trim-both_cap_alphabetic] text-slate-500 text-xs">
                    {description}
                </dd>
            </div>
            <input
                type="text"
                value={value}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
                className="bg-slate-200 border border-slate-400 px-6 py-5 rounded-lg text-sm w-xs focus:border-slate-800 focus:outline-none"
            />
        </div>
    );
}