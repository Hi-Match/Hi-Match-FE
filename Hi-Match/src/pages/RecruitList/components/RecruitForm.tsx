import { useNavigate } from "react-router-dom";

interface RecruitFormProps {
    postingNo: number;
    companyImage: string;
    postingTitle: string;
    postingPart: string;
}

const RecruitForm = ({
    postingNo,
    companyImage,
    postingTitle,
    postingPart,
}: RecruitFormProps) => {
    const navigate = useNavigate();

    const handleClickRecruit = () => {
        navigate(`/company/recruit/detail/${postingNo}`);
    };

    return (
        <div
            className="recruit_form group cursor-pointer rounded-[10px] border-1 border-solid border-gray-200"
            onClick={handleClickRecruit}
        >
            <div className="h-35 w-full overflow-hidden rounded-t-[10px]">
                <img
                    src={companyImage}
                    alt="회사 이미지"
                    className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                />
            </div>
            <div className="recruit_content space-y-2 p-[15px]">
                <p className="truncate text-lg font-semibold text-black">
                    {postingTitle}
                </p>
                <p className="text-gray01 truncate text-base">{postingPart}</p>
            </div>
        </div>
    );
};

export default RecruitForm;
