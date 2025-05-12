import { Editor } from "@tiptap/react";
import H1Icon from "@/assets/icons/h1-icon.svg?react";
import H2Icon from "@/assets/icons/h2-icon.svg?react";
import H3Icon from "@/assets/icons/h3-icon.svg?react";
import BoldIcon from "@/assets/icons/bold-icon.svg?react";
import ItalicIcon from "@/assets/icons/italic-icon.svg?react";
import ListIcon from "@/assets/icons/list-icon.svg?react";
import LinkIcon from "@/assets/icons/link-icon.svg?react";
import UnsetLinkIcon from "@/assets/icons/unset-link-icon.svg?react";

interface ToolbarProps {
    editor: Editor | null;
}

const Toolbar = ({ editor }: ToolbarProps) => {
    const setLink = () => {
        const previousUrl = editor?.getAttributes("link").href;
        const url = window.prompt("링크 URL을 입력하세요", previousUrl || "");

        if (url === null) return;
        if (url === "") {
            editor?.chain().focus().unsetLink().run();
            return;
        }

        const hasSelection =
            editor?.state.selection?.from !== editor?.state.selection?.to;

        if (!hasSelection) {
            alert("링크를 추가하려면 텍스트를 먼저 선택하세요.");
            return;
        }

        editor
            ?.chain()
            .focus()
            .extendMarkRange("link")
            .setLink({ href: url, target: "_blank" })
            .run();
    };

    return (
        <div className="border-gray02 mb-4 flex items-center justify-start space-x-4 border-b-1 border-solid px-4 pb-2">
            <div className="flex-center border-gray02 space-x-2 border-r-1 border-solid pr-4">
                <button
                    type="button"
                    className={`grid-center h-8 w-8 cursor-pointer p-1 ${editor?.isActive("heading", { level: 1 }) ? "bg-blue-100" : ""}`}
                    onClick={() =>
                        editor
                            ?.chain()
                            .focus()
                            .toggleHeading({ level: 1 })
                            .run()
                    }
                >
                    <H1Icon className="h-5 w-5" />
                </button>
                <button
                    type="button"
                    className={`grid-center h-8 w-8 cursor-pointer p-1 ${editor?.isActive("heading", { level: 2 }) ? "bg-blue-100" : ""}`}
                    onClick={() =>
                        editor
                            ?.chain()
                            .focus()
                            .toggleHeading({ level: 2 })
                            .run()
                    }
                >
                    <H2Icon className="h-5 w-5" />
                </button>
                <button
                    type="button"
                    className={`grid-center h-8 w-8 cursor-pointer p-1 ${editor?.isActive("heading", { level: 3 }) ? "bg-blue-100" : ""}`}
                    onClick={() =>
                        editor
                            ?.chain()
                            .focus()
                            .toggleHeading({ level: 3 })
                            .run()
                    }
                >
                    <H3Icon className="h-5 w-5" />
                </button>
            </div>
            <div className="flex-center border-gray02 space-x-2 border-r-1 border-solid pr-4">
                <button
                    type="button"
                    className={`grid-center h-8 w-8 cursor-pointer p-1 ${
                        editor?.isActive("bold") ? "bg-blue-100" : ""
                    }`}
                    onClick={() => editor?.chain().focus().toggleBold().run()}
                >
                    <BoldIcon className="h-4 w-4" />
                </button>
                <button
                    type="button"
                    className={`grid-center h-8 w-8 cursor-pointer p-1 ${
                        editor?.isActive("italic") ? "bg-blue-100" : ""
                    }`}
                    onClick={() => editor?.chain().focus().toggleItalic().run()}
                >
                    <ItalicIcon className="h-4 w-4" />
                </button>
            </div>
            <div className="flex-center border-gray02 space-x-2 border-r-1 border-solid pr-4">
                <button
                    type="button"
                    className={`grid-center h-8 w-8 cursor-pointer p-1 ${
                        editor?.isActive("bulletList") ? "bg-blue-100" : ""
                    }`}
                    onClick={() =>
                        editor?.chain().focus().toggleBulletList().run()
                    }
                >
                    <ListIcon className="h-4 w-4" />
                </button>
            </div>
            <div className="flex-center space-x-2 pr-4">
                <button
                    type="button"
                    onClick={setLink}
                    className={`${
                        editor?.isActive("link") ? "bg-blue-100" : ""
                    } grid-center h-8 w-8 cursor-pointer p-1 focus:bg-gray-50`}
                >
                    <LinkIcon className="h-4 w-4" />
                </button>
                <button
                    type="button"
                    className={`grid-center h-8 w-8 p-1 ${
                        !editor?.isActive("link")
                            ? "btn-disabled"
                            : "cursor-pointer"
                    }`}
                    onClick={() => editor?.chain().focus().unsetLink().run()}
                    disabled={!editor?.isActive("link")}
                >
                    <UnsetLinkIcon className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
};

export default Toolbar;
