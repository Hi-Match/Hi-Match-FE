import { Link } from "react-router-dom";
import { useUserStore } from "@/store/userStore";

const WorknetLink = () => {
    const { user } = useUserStore();
    return (
        <Link
            to="https://www.work.go.kr/consltJobCarpa/jobPsyExamNew/jobPsyExamList.do"
            className="text-lg text-black/70 border-b border-black/70 hover:border-black/90 hover:text-black/90 pb-0.5 w-fit"
        >
            High한 {user?.memberName}님을 Hire하기 위해 더 알고 싶다면?
        </Link>
    );
};

export default WorknetLink;
