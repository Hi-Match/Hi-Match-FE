import { useState } from "react";
import RecruitFormList from "./RecruitFormList";
import ApplicantsList from "./ApplicantsList";

const ApplicantsForm = () => {
    const [selectedPostNo, setSelectedPostNo] = useState<number | null>(null);

    return (
        <div className="w-full space-y-12.5 rounded-[10px] border border-solid border-gray-50 bg-white p-12.5 shadow-sm">
            <RecruitFormList onSelectPost={setSelectedPostNo} />
            <ApplicantsList postNo={selectedPostNo} />
        </div>
    );
};

export default ApplicantsForm;
