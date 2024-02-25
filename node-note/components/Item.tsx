"use client"

import { ChevronDown, ChevronRight, LucideIcon, Plus, Trash } from "lucide-react";
import { Id } from "../convex/_generated/dataModel";
import classNames from "classnames";
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { useRouter } from "next/router";
import { toast } from "sonner";
import React from "react";

interface ItemProps {
    id?: Id<"documents">;
    documentIcon?: string;
    active?: boolean;
    expanded?: boolean;
    isSearch?: boolean;
    level?: number;
    onExpand?: () => void; //optional
    label: string;
    onClick?: () => void; //optional
    icon: LucideIcon

}
export const Item = ({
    id,
    label,
    onClick,
    icon: Icon,
    active,
    documentIcon,
    isSearch,
    level = 0,
    onExpand,
    expanded ,
}: ItemProps) => {
    let ChevronIcon;
    if (expanded) {
        ChevronIcon = ChevronDown;
    } else {
        ChevronIcon = ChevronRight;
    }

    const archive = useMutation(api.documents.archive);
    const onArchive = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        if (!id) return;
        const promise = archive({ id });
        toast.promise(promise, {
            loading: "Moving to trash...",
            success: "Note moved to trash",
            error: "Failed to archive note",
        })
    }

    const create = useMutation(api.documents.create);

    const router = useRouter();

    const handleExpand = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>

    ) => {
        event.stopPropagation();
        onExpand?.();
    }

    const onCreate = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        event.stopPropagation();
        if (!id) return;
        const promise = create({ title: "Untitled", parentDocument: id })
            .then((documentId) => {
                if (!expanded) {
                    onExpand?.();
                }
                router.push(`/documents/${documentId}`)
            })
        toast.promise(promise, {
            loading: "Creating a new note...",
            success: "New note created",
            error: "Failed to create a note",
        }
        )
    }

    return (
        <div
            onClick={onClick}
            role="button"
            style={{
                paddingLeft: level ? `${(level * 12) + 12}px` : "12px"
            }}
            className={classNames(
                "group text-sm py-1 pr-3 w-full flex items-center font-medium hover:bg-transparent/5"
                , active && ""
            )}>
            {!!id && (
                <div
                    role="button"
                    className="h-full rounded-small hover:bg-transparent/5 mr-2"
                    onClick={handleExpand}>
                    <ChevronIcon className="h-4 w-4 shrink-0" />
                </div>
            )}
            {documentIcon ? (
                <div className="shrink-0 mr-2 text-[18px]">
                    {documentIcon}
                </div>
            ) : (
                <Icon className="shrink-0 h-[18px] w-[18px] mr-2" />
            )}
            <span className="truncate">
                {label}
            </span>
            {!!id && (
                <div
                    role="button"
                    className="ml-auto flex items-center gap-x-3"
                    onClick={onCreate}>
                    <div
                        role="button"
                        className="opacity-0 group-hover:opacity-100 h-jull ml-auto rounded-sm hover:bg-neutral-300"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div role="button"
                            onClick={onArchive}>
                            <Trash className="h-4 w-4" />
                        </div>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 ">
                        <Plus className="h-4 w-4" />
                    </div>


                </div>
            )
            }
        </div >
    )
}


Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
    return (
        <div
            style={{
                paddingLeft: level ? `${(level * 12) + 25}px` : "12px"
            }}
            className="flex gap-x-2 py-[3px] animate-pulse"
        >
            <div className="h-4 w-4 bg-gray-400 rounded-full"></div> {/* Placeholder for icon */}
            <div className="flex flex-col justify-center">
                <div className="h-3 w-16 bg-gray-400 rounded-full mb-1"></div> {/* Placeholder for title */}
            </div>
        </div>
    )
}