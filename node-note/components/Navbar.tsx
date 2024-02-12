"use client";

import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import { api } from "../convex/_generated/api";
import { Id } from "../convex/_generated/dataModel";
import { MenuIcon } from "lucide-react";
import { Title } from "./Title";
import { Menu } from "./Menu";

interface NavbarProps {
    isCollapsed: boolean;
    onResetWidth: () => void;
}
export const Navbar = ({
    isCollapsed,
    onResetWidth

}: NavbarProps) => {
    const params = useParams();
    const document = useQuery(api.documents.getById, {
        documentId: params.documentId as Id<"documents">,
    })
    if (document === undefined) {
        return (
            <nav className="bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center justify-between">
                <Title.Skeleton />
                <div className="flex items-center gap-x-2">
                    <Menu.Skeleton />
                </div>
            </nav>
        )

    }
    if (document === null) {
        return null;
    }
    return (
        <>
            <nav className="px-5 flex items-center gap-x-4">
                {isCollapsed && (
                    <MenuIcon
                        role="button"
                        onClick={onResetWidth}
                        className="h-6 w-6" />
                )}
                <div className="flex items-center justify-between w-auto py-5">
                    <Title initialData={document} />
                </div>
            </nav>
        </>
    )
}