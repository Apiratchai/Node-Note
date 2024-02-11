"use client";

import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import { api } from "../convex/_generated/api";
import { Id } from "../convex/_generated/dataModel";
import { MenuIcon } from "lucide-react";
import { Title } from "./Title";

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
        return <nav className="px-3 py-2 w-full flex items-center">
            <Title.Skeleton />
        </nav>
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
                <div className="flex items-center justify-between wf-full py-5">
                    {/* above mt-20 is tricky */}
                    <Title initialData={document} />
                </div>
            </nav>
        </>
    )
}