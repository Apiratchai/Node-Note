"use client";

import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "../@/components/ui/button";
import { api } from "../convex/_generated/api";
import { Id } from "../convex/_generated/dataModel";
import { X } from 'lucide-react';
import React, { useState } from 'react';

interface BannerProps {
    documentId: Id<"documents">;
};

export const Banner = ({
    documentId
}: BannerProps) => {
    const [isBannerVisible, setIsBannerVisible] = useState(true);
    const router = useRouter();

    const remove = useMutation(api.documents.remove);
    const restore = useMutation(api.documents.restore);

    const onCloseBanner = () => {
        setIsBannerVisible(false); // Hide the banner
        router.push("/documents");
    };

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

    if (!isBannerVisible) {
        return null; // If banner is not visible, don't render anything
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
            <Button
            onClick={onCloseBanner}
            className="fixed top-15 right-0 text-white cursor-pointer"
            variant="ghost">
                <X className="w-6 h-6" />
            </Button>
        </div>
    )
}