"use client"

import { LucideIcon } from "lucide-react";
interface ItemProps {
    label: string;
    onCLick: () => void;
    icon: LucideIcon

}

export const Item = ({
    label,
    onCLick,
    icon: Icon,
}: ItemProps) => {
    return (
        <div
            onClick={onCLick}
            role="button"
            style={{ paddingLeft: "12px" }}
            className="text-sm py-1 pr-3 w-full flex items-center text-muted-foreground font-medium"
        >
            <Icon className="shrink-0 h-[18px] mr-2" />
            <span className="truncate">
                {label}
            </span>
        </div>
    )
}