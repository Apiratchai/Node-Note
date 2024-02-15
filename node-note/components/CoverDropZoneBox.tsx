import { SingleImageDropzone } from "../@/components/ui/single-image-dropzone";
import { useState } from "react";
import { useEdgeStore } from "../src/lib/edgestore";
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { Id } from "../convex/_generated/dataModel";
import { useCoverImage } from "../hooks/useCoverImage";
import { useParams } from "next/navigation";

export const CoverDropZoneBox = () => {
    const params = useParams();
    const update = useMutation(api.documents.update);
    const coverImage = useCoverImage()
    const onClose = () => {
        setFile(undefined);
        setIsSubmitting(false);
        coverImage.onClose();
    }
    const [file, setFile] = useState<File>();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { edgestore } = useEdgeStore();
    const onChange = async (file?: File) => {
        if (file) {
            setIsSubmitting(true);
            setFile(file);

            const res = await edgestore.publicFiles.upload({
                file
            })
            await update({
                id: params.documentId as Id<"documents">,
                coverImage: res.url
            })
            onClose();
        }
    }


    return (
        <div className="bg-white  hover:bg-gray-100  border border-gray-300 rounded-lg h-[50%] w-[70%] text-center ">
            {/* Sign Out */}
            <div className="flex items-center gap-x-2 p-2 cursor-pointer">
                <SingleImageDropzone className="border-transparent"
                    disabled={isSubmitting}
                    value={file}
                    onChange={onChange} />
            </div>
        </div>
    );
}

export default CoverDropZoneBox;