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

interface CoverImageProps {
  url?: string;
  preview?: boolean;
}

export const Cover = ({
  url,
  preview,
}: CoverImageProps) => {
  const { edgestore } = useEdgeStore();
  const params = useParams();
  const coverImage = useCoverImage();
  const removeCoverImage = useMutation(api.documents.removeCoverImage);

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
        <Image
          src={url}
          fill
          alt="Cover"
          className="object-cover"
        />
      )}
      {url && !preview && (
        <div className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2">
          <Popover>
            <PopoverTrigger>
              <Button
                onClick={() => coverImage.onOpen}
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