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