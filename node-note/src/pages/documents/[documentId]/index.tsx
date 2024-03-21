import { useRouter } from 'next/router';
import { useQuery } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { Id } from '../../../../convex/_generated/dataModel';
import NoteTakingLayout from '../../../../components/NoteTakingLayout';
import { Toolbar } from '../../../../components/Toolbar';
import { Cover } from '../../../../components/Cover';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import { useMutation } from 'convex/react';
import { Skeleton } from '../../../../@/components/ui/skeleton';

const DocumentIdPage = () => {
    const router = useRouter();
    const { documentId } = router.query; // Access route parameters from router.query

    const Editor = useMemo(() => dynamic(() => import("../../../../components/Editor"), { ssr: false }), []);
    
    const document = useQuery(api.documents.getById, {
        documentId: documentId as Id<"documents"> // Cast documentId to the appropriate type
    });

    const update = useMutation(api.documents.update);

    const onChange = (content: string) => {
        update({
            id: documentId as Id<"documents">,
            content
        });
    };

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
        <NoteTakingLayout>
            <div className="pb-40 ">
                <Cover url={document.coverImage} initialData={document} />
                <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
                    <Toolbar initialData={document} />
                    <Editor
                        onChange={onChange}
                        initialContent={document.content}
                    />
                </div>
            </div>
        </NoteTakingLayout>
    );
}

export default DocumentIdPage;
