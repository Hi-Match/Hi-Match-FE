import RecruitFormList from "./RecruitFormList";
import ApplicantsList from "./ApplicantsList";
import { useRecruitStore } from "@/store/recruitStore";

const ApplicantsForm = () => {
    const { selectedPostNo } = useRecruitStore();

    return (
        <div className="w-full space-y-12.5 rounded-[10px] border border-solid border-gray-50 bg-white p-12.5 shadow-sm">
            <RecruitFormList />
            <ApplicantsList postNo={selectedPostNo} />
        </div>
    );
};

export default ApplicantsForm;
