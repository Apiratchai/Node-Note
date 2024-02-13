"use client";

<<<<<<< HEAD
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { MoreHorizontal, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
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
=======
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { toast } from "sonner";
import { MoreHorizontal, Trash } from "lucide-react";

import { Id } from "../convex/_generated/dataModel";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator
} from "@radix-ui/react-dropdown-menu";
import { api } from "../convex/_generated/api";
import { Button } from "../@/components/ui/button";
import { Skeleton } from "../@/components/ui/skeleton";
>>>>>>> 91c475763cafe3a49ce73b3c2be0da36a4f5f865

interface MenuProps {
    documentId: Id<"documents">;
};

export const Menu = ({
    documentId
}: MenuProps) => {
<<<<<<< HEAD

=======
>>>>>>> 91c475763cafe3a49ce73b3c2be0da36a4f5f865
    const router = useRouter();
    const { user } = useUser();

    const archive = useMutation(api.documents.archive);

    const onArchive = () => {
<<<<<<< HEAD
        const promise = archive({ id: documentId})

        toast.promise(promise, {
            loading: "Moving to Trash...",
=======
        const promise = archive({ id: documentId })

        toast.promise(promise, {
            loading: "Moving to trash...",
>>>>>>> 91c475763cafe3a49ce73b3c2be0da36a4f5f865
            success: "Note moved to trash!",
            error: "Failed to archive note."
        });

        router.push("/documents");
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="sm" variant="ghost">
<<<<<<< HEAD
                    <MoreHorizontal className="h-4 w-4"/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
            className="w-60"
            align="end"
            alignOffset={8}
            forceMount
            >
                <DropdownMenuItem onClick={onArchive}>
                    <Trash className="h-4 w-4 mr-2"/>
                    Delete
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <div className="test-xs text-muted-foreground p-2">
=======
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-60"
                align="end"
                alignOffset={8}
                forceMount
            >
                <DropdownMenuItem onClick={onArchive}>
                    <Trash className="h-4 w-4 mr-2" />
                    Delete
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <div className="text-xs text-muted-foreground p-2">
>>>>>>> 91c475763cafe3a49ce73b3c2be0da36a4f5f865
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