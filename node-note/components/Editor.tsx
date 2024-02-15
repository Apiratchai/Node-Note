"use client"

import {
    BlockNoteEditor,
    PartialBlock
} from "@blocknote/core";

import {
    BlockNoteView,
    useBlockNote
} from "@blocknote/react";

import "@blocknote/react/style.css";


interface EditorProps {
    onChange: (value: string) => void;
    initialContent?: string;
    editable?: boolean;
};

const Editor = ({
    onChange,
    initialContent,
    editable
}: EditorProps) => {
    // const { edgestore } = useEdgeStore();

    // const handleUpload = async (file: File) => {
    //     const response = await edgestore.publicFiles.upload({
    //         file
    //     });

    //     return response.url;
    // }

    const editor: BlockNoteEditor = useBlockNote({
        editable,
        initialContent:
            initialContent
                ? JSON.parse(initialContent)
                : undefined,
        onEditorContentChange: (editor) => {
            onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
        },
        // uploadFile: handleUpload
    })

    return (
        <div>
            <BlockNoteView
                editor={editor}
                theme={"light"}
            />
        </div>
    )
}

export default Editor;