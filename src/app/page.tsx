import { LogoStroke } from "@/components/Logo";
import LinkCard from "@/components/LinkCard";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center gap-14">
            <div className="flex flex-col gap-8 items-center">
                <LogoStroke size={64} />
                <h2 className="font-bold text-4xl [text-box:trim-both_cap_alphabetic]">Palette AI</h2>
                <p className="text-center text-gray-500 leading-loose [text-box:trim-both_cap_alphabetic]">
                    Palette AIは、Webデザインなどで必要な配色を自動生成するAIツールです。
                    <br />
                    配色の知識がない方でも、簡単に生成することができます。
                </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
                <LinkCard
                    url="auto"
                    title="おまかせ自動生成"
                    description="AIが、最適な配色を自動生成します。\nアイデアが思い浮かばない方におすすめです！"
                    badge="おすすめ"
                />
                <LinkCard
                    url="impression"
                    title="与えたい印象から自動生成"
                    description="ユーザーに与えたい印象を選ぶと、AIが最適な配色を自動生成します。"
                    badge={null}
                />
                <LinkCard
                    url="condition"
                    title="指定した条件から自動生成"
                    description="指定したい条件を入力すると、AIが最適な配色を自動生成します。"
                    badge={null}
                />
                <LinkCard
                    url="remaining"
                    title="決まっている色から残りを自動生成"
                    description="３色のうち、決まっている色だけを入力すると、AIがそれ以外の色を自動生成します。"
                    badge={null}
                />
                <LinkCard
                    url="site"
                    title="サイトから配色を抽出"
                    description="参考にしたいサイトのURLを入力すると、AIが自動で配色を抽出します。"
                    badge={null}
                />
                <LinkCard
                    url="image"
                    title="画像から配色を抽出"
                    description="参考にしたい画像を選択すると、Aiが自動で配色を抽出します。"
                    badge={null}
                />
            </div>
        </div>
    )
}