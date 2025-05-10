import AddressInput from "../Input/AddressInput";
import AmbitionInput from "../Input/AmbitionInput";
import ArmyInput from "../Input/ArmyInput";
import AwardInput from "../Input/AwardInput";
import CertificateInput from "../Input/CertificateInput";
import DisabilityInput from "../Input/DisabilityInput";
import EducationInput from "../Input/EducationInput";
import ExperienceInput from "../Input/ExperienceInput";
import ImageUploadInput from "../Input/ImageUploadInput";
import PatriotismInput from "../Input/PatriotismInput";
import PortfolioInput from "../Input/PortfolioInput";
import ProfileInfoInput from "../Input/ProfileInfoInput";
import SchoolInput from "../Input/SchoolInput";

interface ResumeEditFormProps {
    resumeData: ResumeDetailData;
    setResumeData: React.Dispatch<React.SetStateAction<ResumeDetailData>>;
}

const ResumeEditForm = ({ resumeData, setResumeData }: ResumeEditFormProps) => {
    const updateForm = (key: keyof ResumeDetailData, value: string) => {
        setResumeData(prev => {
            if (prev[key] === value) return prev;
            return { ...prev, [key]: value };
        });
    };

    return (
        <div className="space-y-12.5 rounded-[10px] border-1 border-solid border-gray-50 p-12.5 shadow-sm">
            <div className="user_profile_wrapper space-y-12.5">
                <div className="user_profile flex">
                    <ImageUploadInput
                        resumeData={resumeData}
                        onChange={file => updateForm("resumeIMG", file)}
                    />
                    <div className="user_info_wrapper flex-grow space-y-12.5 pl-12.5">
                        <ProfileInfoInput
                            resumeData={resumeData}
                            setResumeData={setResumeData}
                        />
                    </div>
                </div>
                <div className="user_address">
                    <AddressInput
                        resumeData={resumeData}
                        setResumeData={setResumeData}
                    />
                </div>
                <div className="user_ambition">
                    <AmbitionInput
                        resumeData={resumeData}
                        onChange={ambition =>
                            updateForm("resumeAmbition", ambition)
                        }
                    />
                </div>
            </div>
            <div className="user_portfolio space-y-7.5">
                <h4 className="text-xl font-semibold text-black">포트폴리오</h4>
                <PortfolioInput
                    resumeData={resumeData}
                    onChange={url => updateForm("resumePortFolio", url)}
                />
            </div>
            <div className="user_army space-y-7.5">
                <h4 className="text-xl font-semibold text-black">병역사항</h4>
                <ArmyInput
                    resumeData={resumeData}
                    setResumeData={setResumeData}
                />
            </div>
            <div className="user_disability space-y-7.5">
                <h4 className="text-xl font-semibold text-black">장애사항</h4>
                <DisabilityInput
                    resumeData={resumeData}
                    setResumeData={setResumeData}
                />
            </div>
            <div className="user_patiotism space-y-7.5">
                <h4 className="text-xl font-semibold text-black">보훈여부</h4>
                <PatriotismInput
                    resumeData={resumeData}
                    setResumeData={setResumeData}
                />
            </div>
            <div className="user_school space-y-7.5">
                <h4 className="text-xl font-semibold text-black">학력</h4>
                <SchoolInput
                    resumeSchool={resumeData.resumeSchool}
                    setResumeSchool={schools =>
                        setResumeData(prev => ({
                            ...prev,
                            resumeSchool:
                                typeof schools === "function"
                                    ? schools(prev.resumeSchool)
                                    : schools,
                        }))
                    }
                />
            </div>
            <div className="user_experience space-y-7.5">
                <h4 className="text-xl font-semibold text-black">경력</h4>
                <ExperienceInput
                    resumeExperience={resumeData.resumeExperience ?? []}
                    setResumeExperience={experiences =>
                        setResumeData(prev => ({
                            ...prev,
                            resumeExperience:
                                typeof experiences === "function"
                                    ? experiences(prev.resumeExperience ?? [])
                                    : experiences,
                        }))
                    }
                />
            </div>
            <div className="user_award space-y-7.5">
                <h4 className="text-xl font-semibold text-black">수상</h4>
                <AwardInput
                    resumeAward={resumeData.resumeAward ?? []}
                    setResumeAward={awards =>
                        setResumeData(prev => ({
                            ...prev,
                            resumeAward:
                                typeof awards === "function"
                                    ? awards(prev.resumeAward ?? [])
                                    : awards,
                        }))
                    }
                />
            </div>
            <div className="user_certificate space-y-7.5">
                <h4 className="text-xl font-semibold text-black">자격증</h4>
                <CertificateInput
                    resumeCertificate={resumeData.resumeCertificate ?? []}
                    setResumeCertificate={certificates =>
                        setResumeData(prev => ({
                            ...prev,
                            resumeCertificate:
                                typeof certificates === "function"
                                    ? certificates(prev.resumeCertificate ?? [])
                                    : certificates,
                        }))
                    }
                />
            </div>
            <div className="user_education space-y-7.5">
                <h4 className="text-xl font-semibold text-black">교육</h4>
                <EducationInput
                    resumeEducation={resumeData.resumeEducation ?? []}
                    setResumeEducation={educations =>
                        setResumeData(prev => ({
                            ...prev,
                            resumeEducation:
                                typeof educations === "function"
                                    ? educations(prev.resumeEducation ?? [])
                                    : educations,
                        }))
                    }
                />
            </div>
        </div>
    );
};

export default ResumeEditForm;
