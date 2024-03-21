import { useRouter } from 'next/router';
import { useQuery } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { Id } from '../../../../convex/_generated/dataModel';
import NoteTakingLayout from '../../../../components/NoteTakingLayout';
import { Toolbar } from '../../../../components/Toolbar';
import Editor from '../../../../components/Editor';
import { Cover } from '../../../../components/Cover';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import { useMutation } from 'convex/react';
import { Skeleton } from '../../../../@/components/ui/skeleton';
interface DocumentIdPageProps {
    params: {
        documentId: Id<"documents">;
    }
}
const DocumentIdPage = () => {
    const router = useRouter();
    const { documentId } = router.query;

    const document = useQuery(api.documents.getById, {
        documentId: documentId as Id<"documents"> // Assuming documentId is of type Id<"documents">
    });

    if (document === undefined) {
        return (
            <div>
                <Cover.Skeleton />
                <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
                    <div className="space-y-4 pl-8 pt-4">
                        <Skeleton className="h-14 w-[50%]" />
                        <Skeleton className="h-4 w-[80%]" />
                        <Skeleton className="h-4 w-[40%]" />
                        <Skeleton className="h-4 w-[60%]" />
                    </div>
                </div>
            </div>
        );
    }

    if (document === null) {
        return <div>Not found</div>
    }

    return (
            <div className="pb-40 ">
                <Cover preview url={document.coverImage} initialData={document} />
                <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
                    <Toolbar preview initialData={document} />
                    <Editor
                        editable={false}
                        onChange={() => { }}
                        initialContent={document.content} />
                </div>
            </div>
    )
}

export default DocumentIdPage;
