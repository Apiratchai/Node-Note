import { useRouter } from 'next/router';
import { useQuery } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { Id } from '../../../../convex/_generated/dataModel';
import NoteTakingLayout from '../../../../components/NoteTakingLayout';
import { Toolbar } from '../../../../components/Toolbar';
import Editor from '../../../../components/Editor';
import { Cover } from '../../../../components/Cover';

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
        return <div>loading...</div>;
    }

    if (document === null) {
        return <div>Not found</div>;
    }

    return (
        <div className="pb-40">
            <Cover  preview url={document.coverImage} />
            <div className="md:max-w-3xl lg:md-max-w-4xl mx-auto">
                <Toolbar preview initialData={document} />
                <Editor
                    editable={false}
                    onChange={() => { }}
                    initialContent={document.content} />
            </div>
        </div>
    );
};

export default DocumentIdPage;