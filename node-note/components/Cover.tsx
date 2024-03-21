"use client";

import Image from "next/image";
import { ImageIcon, X } from "lucide-react";
import { useMutation } from "convex/react";
import { useParams } from "next/navigation";

import { Skeleton } from "../@/components/ui/skeleton";
import { Button } from "../@/components/ui/button";
import { useCoverImage } from "../hooks/useCoverImage";
import { api } from "../convex/_generated/api";
import { Id } from "../convex/_generated/dataModel";
import { useEdgeStore } from "../src/lib/edgestore";
import classNames from "classnames";
import { Popover, PopoverTrigger, PopoverContent } from "../@/components/ui/popover";
import CoverDropZoneBox from "./CoverDropZoneBox";
import { useRef, useState } from "react";
import { Doc } from "../convex/_generated/dataModel";
import { Input } from "../@/components/ui/input";
import { useUser } from "@clerk/nextjs";

interface CoverImageProps {
  url?: string;
  preview?: boolean;
  initialData?: Doc<"documents">;
}


export const Cover = ({
  url,
  preview,
  initialData
}: CoverImageProps) => {
  const { edgestore } = useEdgeStore();
  const params = useParams();
  const coverImage = useCoverImage();
  const removeCoverImage = useMutation(api.documents.removeCoverImage);
  const { user } = useUser();

  const inputRef = useRef<HTMLInputElement>(null);
  const tagRef = useRef<HTMLInputElement>(null);
  const update = useMutation(api.documents.update);
  const [tag, setTag] = useState(initialData.tag || []);
  const [tagInput, setTagInput] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const enableInput = () => {
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

  const onRemove = async () => {
    if (url) {
      await edgestore.publicFiles.delete({
        url: url
      })
    }
    removeCoverImage({
      id: params.documentId as Id<"documents">
    });
  };

  return (
    <div className={classNames(
      "relative w-full h-[35vh] group",
      !url && "h-[12vh]",
      url && "bg-muted"
    )}>
      {!!url && (
        <div>
          <div className="relative text-black z-[999] left-16 top-16 flex flex-col">
            {url && preview && (
              <div>
                <div className="text-black bg-white font-semibold border border-white rounded-md px-10 py-2 w-80">
                  Permission: view only
                  {/* <div>
                    Author: {user.fullName}
                  </div> */}
                  {/* This is await fix, this div should log the author and show his name, not current user name */}
                </div>
              </div>
            )}
            {tag.length > 0 && !preview && (
              <div>
                <div className="flex flex-row relative right-10">
                  {tag.map((t, index) => (
                    <div key={index} className="border border-solid h-8 mx-1 rounded-md bg-white font-semibold text-blue-500">
                      <span className="font-bold ml-1"># </span>
                      <span>{t}</span>
                      <Button
                        onClick={() => removeTag(t)}
                        variant="ghost"
                        size="sm"
                        className="text-red-500 text-lg bg-white-700 hover:bg-transparent/5"
                      >
                        x
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="w-40 relative right-9 top-7 flex text-blue-500">
                  <span className="px-2 py-1 bg-gray-100 font-bold flex items-center rounded-l-lg">#</span>
                  <Input
                    ref={tagRef}
                    onChange={onTagChange}
                    value={tagInput}
                    placeholder="tag name"
                    spellCheck={false}
                    className="px-2 py-1 focus:ring-transparent text-xl flex-grow rounded-l-none rounded-r-lg"
                    onKeyDown={handleKeyDown}
                  />
                </div>
              </div>
            )}
          </div>
          <Image
            src={url}
            fill
            alt="Cover"
            className="object-cover"
          />

        </div>
      )}
      {url && !preview && (
        <div className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2">
          <Popover>
            <PopoverTrigger>
              <Button
                onClick={() => coverImage.onReplace(url)}
                className="text-muted-foreground text-xs bg-white border"
                variant="outline"
                size="sm"
              >
                <ImageIcon className="h-4 w-4 mr-2 inline" />
                Change cover
              </Button>
            </PopoverTrigger>
            <PopoverContent className="flex justify-center items-center bg-white">
              <CoverDropZoneBox />
            </PopoverContent>
          </Popover>

          <Button
            onClick={onRemove}
            className="text-muted-foreground text-xs bg-white"
            variant="outline"
            size="sm"
          >
            <X className="h-4 w-4 mr-2 inline" />
            Remove
          </Button>
        </div>
      )}
    </div>
  )
}

Cover.Skeleton = function CoverSkeleton() {
  return (
    <Skeleton className="w-full h-[12vh]" />
  )
}