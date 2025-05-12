import TiptapEditor from "@/components/Editor/TiptapEditor";

interface ContentInputProps {
    content: string;
    setContent: (val: string) => void;
}

const ContentInput = ({ content, setContent }: ContentInputProps) => {
    return (
        <div className="content_input">
            <p className="text-gray01 mb-2.5 text-base font-medium">
                상세 내용
                <span className="text-red-500"> &#42;</span>
            </p>
            <TiptapEditor content={content} onChange={setContent} />
        </div>
    );
};

export default ContentInput;
