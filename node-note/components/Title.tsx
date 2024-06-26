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
    const update = useMutation(api.documents.update);
    const [title, setTitle] = useState(initialData.title || "Untitled");
    const [isEditing, setIsEditing] = useState(false);

    const enableInput = () => {
        setTitle(initialData.title);
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

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevent default behavior of the Enter key
            setIsEditing(false);
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
                        onKeyDown={handleKeyDown}
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
            </div>
        </div>
    );
};

Title.Skeleton = function TitleSkeleton() {
    return <Skeleton className="h-9 w-16 rounded-md" />;
};
