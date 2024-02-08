"use client"

import { ChevronDown, ChevronRight, LucideIcon } from "lucide-react";
import { Id } from "../convex/_generated/dataModel";
import classNames from "classnames";

interface ItemProps {
    id?: Id<"documents">;
    documentIcon?: string;
    active?: boolean;
    expanded?: boolean
    isSearch?: boolean;
    level?: number;
    onExpand?: () => void;
    label: string;
    onClick: () => void;
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
    expanded,
}: ItemProps) => {
    let ChevronIcon;
    if (expanded) {
        ChevronIcon = ChevronDown;
    } else {
        ChevronIcon = ChevronRight;
    }

    const handleExpand = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>

    ) => {
        event.stopPropagation();
        onExpand?.();
    }
    return (
        <div
            onClick={onClick}
            role="button"
            style={{
                paddingLeft: level ? `${(level * 12) + 12}px` : "12px"
            }}
            className={classNames(
                "text-sm py-1 pr-3 w-full flex items-center font-medium"
                , active && ""
            )}>
            {!!id && (
                <div
                    role="button"
                    className="h-full rounded-small hover:bg-neutral-300"
                    onClick={handleExpand}>
                    <ChevronIcon className="h-4 w-4 shrink-0" />
                </div>
            )}
            {documentIcon ? (
                <div className="shrink-0 mr-2 text-[18px]">
                    {documentIcon}
                </div>
            ) : (
                <Icon className="shrink-0 h-[18px] mr-2" />
            )}
            <span className="truncate">
                {label}
            </span>
        </div>
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