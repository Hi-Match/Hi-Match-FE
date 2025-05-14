import { useState } from "react";
import RecruitFormList from "./RecruitFormList";
import ApplicantsList from "./ApplicantsList";

const ApplicantsForm = () => {
    const [selectedPostNo, setSelectedPostNo] = useState<number | null>(null);

    return (
        <div className="mx-auto flex w-full max-w-[1000px] min-w-[1000px] flex-col gap-16 space-y-12.5 rounded-[10px] border-1 border-solid border-gray-50 bg-white p-14 shadow-sm min-h-[80vh]">
            <RecruitFormList onSelectPost={setSelectedPostNo} />
            <ApplicantsList postNo={selectedPostNo} />
        </div>
    );
};

export default ApplicantsForm;
