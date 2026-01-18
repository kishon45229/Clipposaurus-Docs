import { StandardDialog } from "@/components/dialogs/StandardDialog";
import { useRedirects } from "@/hooks/useRedirect";
import { ShieldBan } from "lucide-react";

export const RateLimitDialogBoxContainer = () => {
    const { showRateLimitDialog, handleRateLimitDialogBoxOpenChange } = useRedirects();

    return (
        <StandardDialog
            open={showRateLimitDialog}
            onOpenChange={handleRateLimitDialogBoxOpenChange}
            icon={<ShieldBan className="w-12 h-12 drop-shadow-sm" />}
            title={"Rate Limit Exceeded"}
            description={"You've exceeded the allowed number of requests. Please wait a while before trying again."}
            buttons={[{ text: "Understood, I'll Wait", onClick: () => handleRateLimitDialogBoxOpenChange(false) }]}
            showCloseButton={true}
        />
    );
}