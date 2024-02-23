"use client"
import { Doc, Id } from "../convex/_generated/dataModel";
import { IconPicker } from "./IconPicker";
import { Button } from "../@/components/ui/button";
import { X, Smile, ImageIcon } from "lucide-react";
import { ElementRef, useRef, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import TextareaAutosize from "react-textarea-autosize";
import { useCoverImage } from "../hooks/useCoverImage";
import { SingleImageDropzone } from "../@/components/ui/single-image-dropzone";
import { useEdgeStore } from "../src/lib/edgestore";
import { useParams } from "next/navigation";
import { Popover,PopoverTrigger, PopoverContent  } from "../@/components/ui/popover";
import CoverDropZoneBox from "./CoverDropZoneBox";

interface ToolbarProps {
    initialData: Doc<"documents">;
    preview?: boolean;
};

export const Toolbar = ({
    initialData,
    preview
}: ToolbarProps) => {
    const inputRef = useRef<ElementRef<"textarea">>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(initialData.title);
    const update = useMutation(api.documents.update);
    const removeIcon = useMutation(api.documents.removeIcon);

    const enableInput = () => {
        if (preview) return;
        setIsEditing(true);
        setTimeout(() => {
            setValue(initialData.title)
            inputRef.current?.focus()
        }, 0)
    }
    const disableInput = () => setIsEditing(false);
    const onInput = (value: string) => {
        setValue(value);
        update({
            id: initialData._id,
            title: value || "Untitled"
        });
    };

    const onKeyDown = (
        event: React.KeyboardEvent<HTMLTextAreaElement>
    ) => {
        if (event.key === "Enter") {
            event.preventDefault();
            disableInput();
        }
    };

    const onIconSelect = (icon: string) => {
        update({
            id: initialData._id,
            icon,
        });
    };

    const onRemoveIcon = () => {
        removeIcon({
            id: initialData._id
        })
    }


    const coverImage = useCoverImage()


    return (
        <div className="pl-[54px] group relative">
            {!!initialData.icon && !preview && (
                <div className="flex items-center gap-x-2 group/icon pt-6">
                    <IconPicker onChange={onIconSelect}>
                        <p className="text-6xl transition">
                            {initialData.icon}
                        </p>

                    </IconPicker>
                    <Button
                        onClick={onRemoveIcon}
                        className="rounded-full transition text-xs">
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            )}
            {!!initialData.icon && preview && (
                <p className="text-6xl pt-6">
                    {initialData.icon}
                </p>
            )}
            <div className=" flex items-center gap-x-1 py-4">
                {!initialData.icon && !preview && (
                    <IconPicker asChild onChange={onIconSelect}>
                        <Button
                            className="text-xs hover:bg-gray-100"
                            variant="outline"
                            size="sm">
                            <Smile className="h-4 w-4 mr-2" />
                            Add icon
                        </Button>
                    </IconPicker>
                )}
                {!initialData.coverImage && !preview && (
                    <Popover>
                        <PopoverTrigger>
                            <Button
                                className="text-xs hover:bg-gray-100"
                                variant="outline"
                                size="sm"
                                onClick={coverImage.onOpen}>
                                <ImageIcon className="h-4 w-4 mr-2" />
                                Add cover
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="absolute flex justify-center items-center bg-white h-[250px] w-[350px]">
                            <CoverDropZoneBox/>
                        </PopoverContent>
                    </Popover>
                )}
            </div>
            {isEditing && !preview ? (
                <TextareaAutosize
                    ref={inputRef}
                    onBlur={disableInput}
                    onKeyDown={onKeyDown}
                    value={value}
                    onChange={(e) => onInput(e.target.value)}
                    className="text-5xl bg-transparent font-bold break-words outline-none text-[#3F3F3F] resize-none" />
            ) : (
                <div
                    onClick={enableInput}
                    className="pb-[11.5px] text-5xl font-bold break-words outline-none text-[#3F3F3F]">
                    {initialData.title}
                </div>
            )}
        </div>
    )
}