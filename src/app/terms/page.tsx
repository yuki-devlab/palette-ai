import { createMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";
import TermsContainer from "@/app/terms/_components/TermsContainer";

export const metadata = createMetadata({
    title: "利用規約",
    description: "Palette AIの利用規約ページです。",
    path: "/terms",
});

export default function TermsPage() {
    return (
        <div className={cn(
            "flex flex-col gap-10 items-center px-5 w-full mx-auto",
            "md:px-8",
            "xl:px-0",
        )}>
            <TermsContainer />
        </div>
    );
}