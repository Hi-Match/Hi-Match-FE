import PlusIcon from "@/assets/icons/plus-icon.svg?react";
import CoverLetterForm from "./CoverLetterForm";
import { useEffect } from "react";
import toast from "react-hot-toast";

interface CoverLetterFormListProps {
    recruitPost: RecruitPostData;
    setRecruitPost: React.Dispatch<React.SetStateAction<RecruitPostData>>;
}

const CoverLetterFormList = ({
    recruitPost,
    setRecruitPost,
}: CoverLetterFormListProps) => {
    const forms = recruitPost.postingQuestion;

    useEffect(() => {
        if (recruitPost.postingQuestion.length === 0) {
            setRecruitPost(prev => ({
                ...prev,
                postingQuestion: [{ question: "", questionLength: 0 }],
            }));
        }
    }, []);

    const handleAddForm = () => {
        if (recruitPost.postingQuestion.length >= 3) {
            toast.error("등록 가능한 자기소개서 문항은 최대 3개입니다.");

            return;
        }

        setRecruitPost(prev => ({
            ...prev,
            postingQuestion: [
                ...prev.postingQuestion,
                { question: "", questionLength: 0 },
            ],
        }));
    };

    const handleUpdateForm = (
        index: number,
        key: "question" | "length",
        value: any
    ) => {
        const updated = [...recruitPost.postingQuestion];
        if (key === "length") {
            updated[index].questionLength = value;
        } else {
            updated[index].question = value;
        }
        setRecruitPost(prev => ({
            ...prev,
            postingQuestion: updated,
        }));
    };

    const handleRemoveForm = (index: number) => {
        if (recruitPost.postingQuestion.length === 1) return;

        const updated = recruitPost.postingQuestion.filter(
            (_, i) => i !== index
        );

        setRecruitPost(prev => ({
            ...prev,
            postingQuestion: updated,
        }));
    };

    return (
        <div className="space-y-7.5 rounded-[10px] border border-solid border-gray-200 bg-white p-7.5 shadow-sm">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                    <h3 className="text-lg font-semibold text-black">
                        자기소개서 항목
                    </h3>
                    <span className="text-gray01 text-sm">
                        &#40;최소 1개&#41;
                    </span>
                    <span className="text-red-500">&#42;</span>
                </div>
                <button
                    type="button"
                    className="btn-gray flex h-11 items-center space-x-2.5 px-2.5"
                    onClick={handleAddForm}
                >
                    <PlusIcon className="fill-gray02 h-4 w-4" />
                    <span className="text-gray02 text-base font-medium">
                        항목 추가
                    </span>
                </button>
            </div>
            {forms.map((form, index) => (
                <div
                    key={index}
                    className={`${index !== 0 && "border-gray03 w-full border-t-1 border-solid pt-7.5"}`}
                >
                    <CoverLetterForm
                        index={index}
                        length={form.questionLength}
                        onChange={(key, val) =>
                            handleUpdateForm(index, key, val)
                        }
                        onRemove={
                            index === 0
                                ? undefined
                                : () => handleRemoveForm(index)
                        }
                    />
                </div>
            ))}
        </div>
    );
};

export default CoverLetterFormList;
