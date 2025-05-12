import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import { useEffect, useRef } from "react";
import Toolbar from "./Toolbar";

interface TiptapEditorProps {
    content: string;
    onChange: (val: string) => void;
}

const TiptapEditor = ({ content, onChange }: TiptapEditorProps) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Link.configure({
                openOnClick: false,
                autolink: true,
                defaultProtocol: "https",
                protocols: ["http", "https"],
            }),
        ],
        editorProps: {
            attributes: {
                class: "editor prose max-w-full h-[510px] overflow-y-auto scroll-custom px-2",
            },
        },
        content: "",
        onUpdate({ editor }) {
            onChange(editor.getHTML());
        },
    });

    const hasSetInitialContent = useRef(false);

    useEffect(() => {
        if (editor && content && !hasSetInitialContent.current) {
            editor.commands.setContent(content);
            hasSetInitialContent.current = true;
        }
    }, [editor, content]);

    return (
        <>
            {editor && (
                <div className="h-150 rounded-[10px] border-1 border-solid border-gray-300 px-4 py-2">
                    <Toolbar editor={editor} />
                    <div className="overflow-hidden pb-2">
                        <EditorContent
                            id="tiptap"
                            editor={editor}
                            className="editor prose scroll-custom h-[510px] max-w-full overflow-y-auto"
                            onClick={() => editor?.commands.focus()}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default TiptapEditor;
