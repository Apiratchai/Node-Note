import { Doc } from "../convex/_generated/dataModel";
import { api } from "../convex/_generated/api";
import { useMutation } from "convex/react";
import { useRef, useState } from "react";
import { Input } from "../@/components/ui/input";
import { Button } from "../@/components/ui/button";
import { Skeleton } from "../@/components/ui/skeleton";
import { UserButton } from "@clerk/nextjs";
import { Divide } from "lucide-react";

interface TitleProps {
    initialData: Doc<"documents">;
}

export const Title = ({ initialData }: TitleProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const tagRef = useRef<HTMLInputElement>(null);
    const update = useMutation(api.documents.update);
    const [title, setTitle] = useState(initialData.title || "Untitled");
    const [tag, setTag] = useState(initialData.tag || []);
    const [tagInput, setTagInput] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    const enableInput = () => {
        setTitle(initialData.title);
        setTag(initialData.tag || []);
        setIsEditing(true);
        setTimeout(() => {
            inputRef.current?.focus();
            inputRef.current?.setSelectionRange(0, inputRef.current.value.length);
        }, 0);
    };

    const disableInput = () => {
        setIsEditing(false);
    };

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
        update({
            id: initialData._id,
            title: event.target.value || "Untitled"
        });
    };

    const onTagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTagInput(event.target.value);
    };

    const addTag = () => {
        if (tagInput.trim()) {
            const updatedTags = [...tag, tagInput.trim()];
            setTag(updatedTags);
            update({
                id: initialData._id,
                tag: updatedTags
            });
            setTagInput(""); // Clear the tag input field after adding the tag
            disableInput();
        }
    };

    const removeTag = (tagToRemove: string) => {
        const updatedTags = tag.filter(t => t !== tagToRemove);
        setTag(updatedTags);
        update({
            id: initialData._id,
            tag: updatedTags
        });
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevent default behavior of the Enter key
            addTag(); // Call addTag function to add the tag
        }
    };

    return (
        <div className="flex">
            <div className="flex flex-row items-center gap-x-1">
                {!!initialData.icon && <p>{initialData.icon}</p>}
                {isEditing ? (
                    <Input
                        ref={inputRef}
                        onClick={enableInput}
                        onBlur={disableInput}
                        onChange={onChange}
                        value={title}
                        spellCheck={false}
                        className="px-2 focus:ring-transparent text-xl"
                    />
                ) : (
                    <div className="flex flex-col">
                        <Button
                            onClick={enableInput}
                            size="lg"
                            variant="ghost"
                            className="font-normal underline underline-offset-4 text-xl w-0"
                        >
                            <span className="truncate">{initialData?.title}</span>
                        </Button>
                    </div>
                )}
                {tag.length > 0 && (
                    <div className="flex flex-row relative top-12 bg-white-700">
                        {tag.map((t, index) => (
                            <div key={index} className="border border-solid h-8 mx-1 rounded-md">
                                <span className="">#{t}</span>
                                <Button
                                    onClick={() => removeTag(t)}
                                    variant="ghost"
                                    size="sm"
                                    className="text-red-500 w-6 h-6 bg-white-700"
                                >
                                    x
                                </Button>
                            </div>
                        ))}
                    </div>
                )}
                {(
                    <div className="flex flex-col absolute top-24">
                        <Input
                            ref={tagRef}
                            onChange={onTagChange}
                            value={tagInput}
                            placeholder="Add tag"
                            spellCheck={false}
                            className="px-2 focus:ring-transparent text-xl"
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

Title.Skeleton = function TitleSkeleton() {
    return <Skeleton className="h-9 w-16 rounded-md" />;
};
