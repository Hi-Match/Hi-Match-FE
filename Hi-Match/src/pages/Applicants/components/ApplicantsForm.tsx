import { useState } from "react";
import RecruitFormList from "./RecruitFormList";

const ApplicantsForm = () => {
    const [selectedPostNo, setSelectedPostNo] = useState<number | null>(null);

    console.log(selectedPostNo);

    return (
        <div className="w-full rounded-[10px] border border-solid border-gray-50 bg-white p-12.5 shadow-sm">
            <RecruitFormList onSelectPost={setSelectedPostNo} />
        </div>
    );
};

export default ApplicantsForm;
