import { useEffect } from "react";
import ApplicantStatus from "./components/ApplicantStatus";
import CoverLetterForm from "./components/CoverLetterForm";
import ResumeForm from "./components/ResumeForm";

const ApplicantResume = () => {
    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, []);

    return (
        <div className="applicant_resume grid w-full grid-cols-7 gap-7.5">
            <div className="col-span-4">
                <ResumeForm />
            </div>
            <div className="col-span-3 space-y-7.5">
                <CoverLetterForm />
                <ApplicantStatus />
            </div>
        </div>
    );
};

export default ApplicantResume;
