"use client";

import { useQuery } from "convex/react";
import { MenuIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { api } from "../convex/_generated/api";
import { Id } from "../convex/_generated/dataModel";
import { Banner } from "./Banner";
import { Menu } from "./Menu";
import { Publish } from "./Publish";
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
        return <nav className="bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center justify-between">
            <Title.Skeleton />
            <div className="flex items-center gap-x-2">
                <Menu.Skeleton />
            </div>
        </nav>
    }
    if (document === null) {
        return null;
    }
    return (
        <>
            <nav className="pl-5 bg-white flex items-center gap-x-4">
                {isCollapsed && (
                    <MenuIcon
                        role="button"
                        onClick={onResetWidth}
                        className="h-6 w-6 hover:bg-gray-100" />
                )}
                <div className="flex items-center justify-between w-full py-2 sticky">
                    {/* above mt-20 is tricky */}
                    <Title initialData={document}/>
                    {/*  */}
                    <div className="flex items-center gap-x-2  ">
                        <Publish initialData={document} />
                        <div className="hover:bg-gray-100">
                            <Menu documentId={document._id} />
                        </div>
                    </div>
                </div>
            </nav>
            {document.isArchived && (
                <Banner documentId={document._id} />
            )}
        </>
    )
}