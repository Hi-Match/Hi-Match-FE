import PlusIcon from "@/assets/icons/plus-icon.svg?react";
import { useNavigate } from "react-router-dom";

const CreateResume = () => {
    const navigate = useNavigate();

    const handleClickCreate = () => {
        navigate("/mypage/resume/write");
    };

    return (
        <div
            className="grid-center hover:[&>svg]:fill-gray02 hover:[&>p]:text-gray01 h-50 w-75 cursor-pointer space-y-2.5 rounded-[10px] border-2 border-solid border-gray-100 bg-white transition-all duration-300 hover:bg-gray-50"
            onClick={handleClickCreate}
        >
            <p className="text-gray02 text-lg font-medium transition-all duration-300">
                새 이력서 작성하기
            </p>
            <PlusIcon className="h-8 w-8 fill-gray-300 transition-all duration-300" />
        </div>
    );
};

export default CreateResume;
