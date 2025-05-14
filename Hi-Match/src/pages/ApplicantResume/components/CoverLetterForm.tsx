import axiosInstance from "@/apis/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

type CoverLetterInfo = {
    coverQuestion: string;
    coverContent: string;
};

interface CoverLetterData {
    applicationCover: CoverLetterInfo[];
}

const CoverLetterForm = () => {
    const { resumeNo } = useParams();

    const { data } = useQuery<CoverLetterData>({
        queryKey: ["applicant-resume", resumeNo],
        queryFn: async () => {
            const response = await axiosInstance.get<CoverLetterData>(
                `/himatch/application/company/apply-detail?applicationNo=${resumeNo}`
            );

            return response.data;
        },
    });

    if (!data) return null;

    const { applicationCover } = data;

    return (
        <div className="cover_letter_form w-full space-y-7.5 rounded-[10px] border-1 border-solid border-gray-50 bg-white p-12.5 shadow-sm">
            <h3 className="mb-7.5 text-xl font-semibold text-black">
                자기소개서 항목
            </h3>
            {applicationCover.map(({ coverQuestion, coverContent }, index) => (
                <div key={index} className="space-y-5">
                    <h4 className="text-lg font-medium text-black">
                        {index + 1} &#46; {coverQuestion}
                    </h4>
                    <div className="space-y-2">
                        <div className="border-gray03 scroll-custom h-75 min-h-75 space-x-2 overflow-y-auto rounded-[5px] border-1 border-solid p-2.5 text-black">
                            <p className="align-middle text-lg/8">
                                {coverContent}
                            </p>
                        </div>
                        <span className="text-gray01 mr-2 flex justify-end text-sm">
                            &#40;{coverContent.length}자&#41;
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CoverLetterForm;
