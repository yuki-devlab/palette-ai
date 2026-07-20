import { toast } from "sonner";
import AppToast from "@/components/toast/AppToast";

type ShowAppToastProps = {
    title: string;
};

export function showAppToast({ title }: ShowAppToastProps) {
    return toast.custom(() => (
        <AppToast title={title} />
    ));
}