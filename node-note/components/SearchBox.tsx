"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation } from "convex/react";
import { Search, Trash, Undo } from "lucide-react";

import { api } from "../convex/_generated/api";
import { Spinner } from "flowbite-react";
import { Input } from "../@/components/ui/input"
export const SearchBox = () => {
    const router = useRouter();
    const documents = useQuery(api.documents.getSearch);

    const [search, setSearch] = useState("");
    const filteredDocuments = documents?.filter((document) => {
        return document.title.toLowerCase().includes(search.toLowerCase());
    });

    const onClick = (documentId: string) => { //this is just go-to the document
        router.push(`/documents/${documentId}`);
    };


    if (documents === undefined) {
        return (
            <div className="h-full flex items-center justify-center pt-16">
                <Spinner size="md animate-spin" />
            </div>
        );
    }

    return (
        <div className="text-sm bg-white border border-gray-300 rounded-r-lg mt-16 pt-2 text-black">
            <div className="flex items-center gap-x-1 p-2 text-blue-500">
                <Search className="h-4 w-4 mr-2 " />
                <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="h-7 px-2 focus-visible:ring-transparent bg-white text-blue-500"
                    placeholder="Filter by page title..."
                />
            </div>
            <div className="mt-2 px-1 pb-1">
                <p className="hidden last:block text-xs text-center text-muted-foreground pb-2">
                    No documents found.
                </p>
                {filteredDocuments?.map((document, index) => (
                    <div
                        key={document._id}
                        className={`text-sm rounded-sm w-full flex items-center text-primary justify-between ${index !== filteredDocuments.length - 1 ? 'mb-2' : ''}`}
                        role="button"
                        onClick={() => onClick(document._id)}
                        style={{ marginBottom: index !== filteredDocuments.length - 1 ? '8px' : 0 }}
                    >
                        <span className="truncate pl-2 hover:bg-gray-100 w-full">
                            {document.title}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};