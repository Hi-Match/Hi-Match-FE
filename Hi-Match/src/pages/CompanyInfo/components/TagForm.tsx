import PlusIcon from "@/assets/icons/plus-icon.svg?react";
import { COMPANY_TAGS } from "@/constants";
import toast from "react-hot-toast";

interface TagFormProps {
    tags: CompanyTag[];
    setTags: (tags: CompanyTag[]) => void;
}

const TagForm = ({ tags, setTags }: TagFormProps) => {
    const MAX_TAGS = 30;

    const handleClickTag = (tag: string) => {
        const exists = tags.some(t => t.tagName === tag);

        if (exists) {
            const filtered = tags.filter(t => t.tagName !== tag);
            setTags(filtered);
        } else {
            if (MAX_TAGS <= tags.length) {
                toast.error("태그는 최대 30개까지 선택할 수 있습니다.");
                return;
            }
            setTags([...tags, { tagName: tag }]);
        }
    };

    return (
        <div className="tag_form flex flex-wrap gap-x-2.5 gap-y-4">
            {COMPANY_TAGS.map((tag, index) => (
                <button
                    key={index}
                    type="button"
                    className={`flex h-11 cursor-pointer items-center space-x-2 border border-solid bg-white px-5 font-semibold duration-100 ${
                        tags.some(t => t.tagName === tag)
                            ? "border-blue-500 bg-blue-100 text-blue-500"
                            : "text-gray02 border-gray-300 bg-white"
                    }`}
                    onClick={() => handleClickTag(tag)}
                >
                    <PlusIcon
                        className={`h-4 w-4 ${
                            tags.some(t => t.tagName === tag)
                                ? "fill-blue-500"
                                : "fill-gray02"
                        }`}
                    />
                    <span>{tag}</span>
                </button>
            ))}
        </div>
    );
};

export default TagForm;
