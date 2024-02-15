"use client";

import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "../@/components/ui/button";
import { api } from "../convex/_generated/api";
import { Id } from "../convex/_generated/dataModel";

interface BannerProps {
    documentId: Id<"documents">;
};

export const Banner = ({
    documentId
}: BannerProps) => {
    const router = useRouter();

    const remove = useMutation(api.documents.remove);
    const restore = useMutation(api.documents.restore);

    const onRemove = () => {
        const promise = remove({ id: documentId });

        toast.promise(promise, {
            loading: "Deleating Note...",
            success: "Note deleted!",
            error: "Failed to delete note."
        });

        router.push("/documents");
    };

    const onRestore = () => {
        const promise = restore({ id: documentId });

        toast.promise(promise, {
            loading: "Restoring Note...",
            success: "Note restored!",
            error: "Failed to restore note."
        })
    }

    return (
        <div className="w-full bg-rose-500 text-center text-base p-2 text-white flex items-center gap-x-3 justify-center">
            <p>
                This page is in the trash.
            </p>
            <Button
                size="sm"
                onClick={onRestore}
                variant="outline"
                className="border-white bg-white hover:bg-rose-400 hover:text-white text-black p-1 px-2 h-auto font-normal">
                Restore Page
            </Button>
            <Button
                size="sm"
                onClick={onRemove}
                variant="outline"
                className="border-white bg-transparent hover:bg-transparent/10 text-white p-1 px-2 h-auto font-normal">
                Delete forever
            </Button>
        </div>
    )
}