interface CoverLetterListProps {
    postingQuestion: PostingQuestion[];
}

const CoverLetterList = ({ postingQuestion }: CoverLetterListProps) => {
    return (
        <div className="post_detail w-full rounded-[10px] border-1 border-solid border-gray-50 bg-white p-12.5 shadow-sm">
            <h3 className="mb-2.5 text-xl font-semibold text-black">
                자기소개서 항목
            </h3>
            <div className="space-y-7.5">
                {postingQuestion.map(({ question, questionLength }, index) => (
                    <div
                        key={index}
                        className={`space-y-2.5 pt-7.5 ${index !== 0 ? "border-t-1 border-solid border-gray-200" : ""}`}
                    >
                        <h4 className="text_black text-lg font-medium">
                            질문 {index + 1} &#46;
                        </h4>
                        <div className="space-x-2 text-black">
                            <span className="align-middle text-lg/8">
                                {question}
                            </span>
                            <span className="text-lg">
                                &#40; {questionLength}자 &#41;
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CoverLetterList;
