"use client";

import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { MoreHorizontal, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "../@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "../@/components/ui/dropdown-menu";
import { Skeleton } from "../@/components/ui/skeleton";
import { api } from "../convex/_generated/api";
import { Id } from "../convex/_generated/dataModel";

interface MenuProps {
    documentId: Id<"documents">;
};

export const Menu = ({
    documentId
}: MenuProps) => {
    const router = useRouter();
    const { user } = useUser();
    const params = useParams();
    const document = useQuery(api.documents.getById, {
        documentId: params.documentId as Id<"documents">,
    })
    const archive = useMutation(api.documents.archive);

    const onArchive = () => {
        const promise = archive({ id: documentId })

        toast.promise(promise, {
            loading: "Moving to Trash...",
            success: "Note moved to trash!",
            error: "Failed to archive note."
        });

        // router.push("/documents");
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="sm" variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-60 bg-white z-[999999]"
                align="end"
                alignOffset={8}
                forceMount
            >
                {!document.isArchived && (
                    <DropdownMenuItem role="button" className="w-full border-b hover:bg-gray-100" onClick={onArchive}>
                        <Trash className="h-4 w-4 mr-2" />
                        Delete
                    </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <div className="test-xs text-muted-foreground p-2">
                    Last edited by: {user?.fullName}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

Menu.Skeleton = function MenuSkeleton() {
    return (
        <Skeleton className="h-10 w-10" />
    )
}