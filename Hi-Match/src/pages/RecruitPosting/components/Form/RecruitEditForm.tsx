import AddressInput from "../Input/AddressInput";
import DeadLineInput from "../Input/DeadLineInput";
import EducationInput from "../Input/EducationInput";
import ExperienceInput from "../Input/ExperienceInput";
import PartInput from "../Input/PartInput";
import PositionInput from "../Input/PositionInput";
import SalaryInput from "../Input/SalaryInput";
import TypeInput from "../Input/TypeInput";
import WorkTypeInput from "../Input/WorkTypeInput";
import ContentInput from "../Input/ContentInput";
import { formatDateYMD, formatTime } from "@/utils/dateFormat";

type RecruitPostEditData = RecruitPostData & { postingNo: number };

interface RecruitEditFormProps {
    recruitPost: RecruitPostEditData;
    setRecruitPost: React.Dispatch<React.SetStateAction<RecruitPostEditData>>;
}

const RecruitEditForm = ({
    recruitPost,
    setRecruitPost,
}: RecruitEditFormProps) => {
    const updateInfo = (key: keyof RecruitPostEditData, value: string) => {
        setRecruitPost(prev => {
            if (prev[key] === value) return prev;
            return { ...prev, [key]: value };
        });
    };

    return (
        <form className="recruit_post_form space-y-7.5">
            <div className="w-full space-y-7.5 rounded-[10px] border-1 border-solid border-gray-50 bg-white p-12.5 shadow-sm">
                <h3 className="mb-7.5 text-lg font-semibold text-black">
                    채용 공고 수정하기
                </h3>
                <div className="w-181.5 space-y-7.5">
                    <PositionInput
                        position={recruitPost.postingTitle}
                        setPostion={position =>
                            updateInfo("postingTitle", position)
                        }
                    />
                    <div className="flex items-center space-x-7.5">
                        <PartInput
                            part={recruitPost.postingPart}
                            setPart={part => updateInfo("postingPart", part)}
                        />
                        <TypeInput
                            type={recruitPost.postingType}
                            setType={type => updateInfo("postingType", type)}
                        />
                    </div>
                    <WorkTypeInput
                        workType={recruitPost.postingWorkType}
                        setWorkType={workType =>
                            updateInfo("postingWorkType", workType)
                        }
                        setWorkStartTime={start =>
                            updateInfo("postingWorkStartTime", start ?? "")
                        }
                        setWorkEndTime={end =>
                            updateInfo("postingWorkEndTime", end ?? "")
                        }
                        initialStartTime={formatTime(
                            recruitPost.postingWorkStartTime ?? ""
                        )}
                        initialEndTime={formatTime(
                            recruitPost.postingWorkEndTime ?? ""
                        )}
                    />
                    <SalaryInput
                        salary={recruitPost.postingSal}
                        setSalary={sal => updateInfo("postingSal", sal)}
                    />
                    <div className="flex items-center space-x-7.5">
                        <ExperienceInput
                            experience={recruitPost.postingExperience}
                            setExperience={exp =>
                                updateInfo("postingExperience", exp)
                            }
                        />
                        <EducationInput
                            education={recruitPost.postingEducation}
                            setEducation={edu =>
                                updateInfo("postingEducation", edu)
                            }
                        />
                    </div>
                    <AddressInput
                        address={recruitPost.postingLocation}
                        setAddress={address =>
                            updateInfo("postingLocation", address)
                        }
                    />
                    <DeadLineInput
                        initialDeadLine={formatDateYMD(
                            recruitPost.postingDeadLine
                        )}
                        setDeadLine={date =>
                            updateInfo("postingDeadLine", date)
                        }
                    />
                    <ContentInput
                        content={recruitPost.postingContent}
                        setContent={content =>
                            updateInfo("postingContent", content)
                        }
                    />
                </div>
            </div>
        </form>
    );
};

export default RecruitEditForm;
