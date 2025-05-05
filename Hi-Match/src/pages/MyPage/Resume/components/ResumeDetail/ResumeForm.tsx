import axiosInstance from "@/apis/axiosInstance";
import { formatDate } from "@/utils/dateFormat";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { formatPhoneNumber } from "@/utils/phoneFormat";

const ResumeForm = () => {
    const { resumeNo } = useParams<{ resumeNo: string }>();

    const { data } = useQuery<ResumeDetailData>({
        queryKey: ["resume-detail", resumeNo],
        queryFn: async () => {
            const response = await axiosInstance.get<ResumeDetailData>(
                `/himatch/resume/detail?resumeNo=${resumeNo}`
            );

            return response.data;
        },
    });

    if (!data) return null;

    const {
        resumeTitle,
        resumeName,
        resumeEngName,
        resumeMail,
        resumeTel,
        resumeAddress,
        resumeBirthDay,
        resumeGender,
        resumeIMG,
        resumePortFolio,
        resumeAmbition,
        resumeArmyType,
        resumeArmyPart,
        resumeArmyDate,
        resumeArmyEnd,
        resumeDisability,
        resumeDisabilityType,
        resumeRewardingPatriotism,
        resumeSchool,
        resumeExperience,
        resumeCertificate,
        resumeEducation,
        resumeAward,
    } = data;

    const getSchoolDegree = (schoolLev: number) => {
        switch (schoolLev) {
            case 1:
                return "고등학교";
            case 2:
                return "전문학사";
            case 3:
                return "대학교(학사)";
            case 4:
                return "대학교(석사)";
            case 5:
                return "대학교(박사)";
            default:
                return "고등학교";
        }
    };

    return (
        <div className="resume_form_wrapper">
            <h2 className="mb-7.5 text-2xl font-semibold text-black">
                {resumeTitle}
            </h2>
            <div className="rounded-[10px] border-1 border-solid border-gray-50 p-12.5 shadow-sm [&>div:not(:first-child)]:py-12.5">
                <div className="[&>div:not(:first-child)]:py-12.5">
                    <div className="user_profile_wrapper">
                        <div className="user_profile flex">
                            <div className="profile_image h-62.5 w-48 rounded-[5px] border-1 border-solid">
                                <img src={resumeIMG} alt="이력서 사진" />
                            </div>
                            <div className="user_info_wrapper flex-grow px-12.5">
                                <div className="user_name mb-7.5 flex items-center space-x-2.5">
                                    <p className="text-[28px] font-semibold text-black">
                                        {resumeName}
                                    </p>
                                    <p className="text-gray01">
                                        {resumeEngName}
                                    </p>
                                </div>
                                <div className="user_info space-y-2.5">
                                    <div className="user_email flex items-center [&>p:first-child]:w-18">
                                        <p className="text-gray01">생년월일</p>
                                        <p className="font-medium text-black">
                                            {resumeBirthDay}
                                        </p>
                                    </div>
                                    {resumeGender && (
                                        <div className="user_email flex items-center [&>p:first-child]:w-18">
                                            <p className="text-gray01">성별</p>
                                            <p className="font-medium text-black">
                                                {resumeGender === "M"
                                                    ? "남"
                                                    : "여"}
                                            </p>
                                        </div>
                                    )}
                                    <div className="user_email flex items-center [&>p:first-child]:w-18">
                                        <p className="text-gray01">이메일</p>
                                        <p className="font-medium text-black">
                                            {resumeMail}
                                        </p>
                                    </div>
                                    <div className="user_phone flex items-center [&>p:first-child]:w-18">
                                        <p className="text-gray01">연락처</p>
                                        <p className="font-medium text-black">
                                            {formatPhoneNumber(resumeTel)}
                                        </p>
                                    </div>
                                    <div className="user_address flex items-center [&>p:first-child]:w-18">
                                        <p className="text-gray01">주소</p>
                                        <p className="font-medium text-black">
                                            {resumeAddress}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {resumeAmbition && (
                            <div className="user_ambition py-12.5">
                                <p className="text-base text-black">
                                    {resumeAmbition}
                                </p>
                            </div>
                        )}
                    </div>
                    {resumePortFolio && (
                        <div className="user_portfolio border-gray03 flex items-center space-x-7.5 border-t-1 border-solid">
                            <h4 className="text-xl font-semibold text-black">
                                포트폴리오
                            </h4>
                            <Link
                                to={resumePortFolio}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline"
                            >
                                {resumePortFolio}
                            </Link>
                        </div>
                    )}
                    <div className="border-gray03 space-y-7.5 border-t-1 border-solid">
                        {resumeArmyType === "대상" && (
                            <div className="space-y-7.5">
                                <h4 className="text-xl font-semibold text-black">
                                    병역사항
                                </h4>
                                <div className="edu_info flex items-center space-x-2">
                                    <p>{resumeArmyPart}</p>
                                    <span>&#124;</span>
                                    <div className="army_date flex items-center space-x-1">
                                        <p>{formatDate(resumeArmyDate)}</p>
                                        <span>&#126;</span>
                                        <p>{formatDate(resumeArmyEnd)}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                        {resumeDisabilityType && resumeDisability && (
                            <div className="space-y-7.5">
                                <h4 className="text-xl font-semibold text-black">
                                    장애사항
                                </h4>
                                <div className="edu_info flex items-center space-x-2">
                                    <p>{resumeDisabilityType}</p>
                                    <span>&#124;</span>
                                    <p>{resumeDisability}</p>
                                </div>
                            </div>
                        )}
                        {resumeRewardingPatriotism && (
                            <div className="space-y-7.5">
                                <h4 className="text-xl font-semibold text-black">
                                    보훈사항
                                </h4>
                                <div className="flex items-center [&>p:first-child]:w-18">
                                    <p className="text-gray01">보훈번호</p>
                                    <p>{resumeRewardingPatriotism}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="border-gray03 space-y-7.5 border-t-1 border-solid">
                    <h4 className="text-xl font-semibold text-black">학력</h4>
                    {resumeSchool.map(
                        ({
                            schoolName,
                            schoolMajor,
                            schoolMinor,
                            schoolMultiple,
                            schoolDegree,
                            schoolGPA,
                            schoolStandardGPA,
                            schoolLev,
                            schoolGraduationDate,
                            schoolAdmissionDate,
                        }) => (
                            <div key={schoolLev} className="space-y-2.5">
                                <p className="text-lg font-medium text-black">
                                    {schoolName}
                                </p>
                                <div className="text-gray01 space-y-1 text-sm">
                                    <div className="edu_info flex items-center space-x-2">
                                        <p>{getSchoolDegree(schoolLev)}</p>
                                        {schoolMajor && (
                                            <>
                                                <span>&#124;</span>
                                                <p>{schoolMajor}</p>
                                            </>
                                        )}
                                        {schoolDegree === "편입" && (
                                            <>
                                                <span>&#124;</span>
                                                <p>{schoolDegree}</p>
                                            </>
                                        )}
                                    </div>
                                    <div className="edu_info flex items-center space-x-1">
                                        {schoolMinor && (
                                            <>
                                                <p>부전공</p>
                                                <span>&#58;</span>
                                                <p>{schoolMinor}</p>
                                            </>
                                        )}
                                    </div>
                                    <div className="edu_info flex items-center space-x-1">
                                        {schoolMultiple && (
                                            <>
                                                <p>복수전공</p>
                                                <span>&#58;</span>
                                                <p>{schoolMultiple}</p>
                                            </>
                                        )}
                                    </div>
                                    <div className="school_date flex items-center space-x-1">
                                        <p>{formatDate(schoolAdmissionDate)}</p>
                                        <span>&#126;</span>
                                        {schoolGraduationDate ? (
                                            <p>
                                                {formatDate(
                                                    schoolGraduationDate
                                                )}
                                            </p>
                                        ) : (
                                            <p>재학중</p>
                                        )}
                                    </div>
                                    {schoolGPA && schoolStandardGPA && (
                                        <div className="school_gpa flex items-center space-x-1">
                                            <p>{schoolGPA}</p>
                                            <span>&#47;</span>
                                            <p>{schoolStandardGPA}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    )}
                </div>
                {resumeExperience && (
                    <div className="border-gray03 space-y-7.5 border-t-1 border-solid">
                        <h4 className="text-xl font-semibold text-black">
                            경력
                        </h4>
                        {resumeExperience.map(
                            (
                                {
                                    expCompanyName,
                                    expPosition,
                                    expPart,
                                    expAchievement,
                                    expIsCurrent,
                                    expStartDate,
                                    expEndDate,
                                },
                                index
                            ) => (
                                <div key={index} className="space-y-2.5">
                                    <p className="text-lg font-medium text-black">
                                        {expCompanyName}
                                    </p>
                                    <div className="text-gray01 space-y-1 text-sm">
                                        <div className="school_gpa flex items-center space-x-1">
                                            <p>{formatDate(expStartDate)}</p>
                                            <span>&#126;</span>
                                            {expIsCurrent ? (
                                                <p>재직중</p>
                                            ) : (
                                                <p>{formatDate(expEndDate)}</p>
                                            )}
                                        </div>
                                        <p>{expPosition}</p>
                                        <p>{expPart}</p>
                                        <p>{expAchievement}</p>
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                )}
                {resumeAward && (
                    <div className="border-gray03 space-y-7.5 border-t-1 border-solid">
                        <h4 className="text-xl font-semibold text-black">
                            수상 내역
                        </h4>
                        {resumeAward.map(
                            (
                                {
                                    awaTitle,
                                    awaCompetitionName,
                                    awaOrgan,
                                    awaContent,
                                    awaDate,
                                },
                                index
                            ) => (
                                <div key={index} className="space-y-2.5">
                                    <p className="text-lg font-medium text-black">
                                        {awaCompetitionName}
                                    </p>
                                    <div className="text-gray01 space-y-1 text-sm">
                                        <div className="edu_info flex items-center space-x-2">
                                            <p>{awaOrgan}</p>
                                            <span>&#124;</span>
                                            <p>{awaTitle}</p>
                                        </div>
                                        <p>{formatDate(awaDate)}</p>
                                        <p>{awaContent}</p>
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                )}
                {resumeCertificate && (
                    <div className="border-gray03 space-y-7.5 border-t-1 border-solid">
                        <h4 className="text-xl font-semibold text-black">
                            자격증
                        </h4>
                        {resumeCertificate.map(
                            (
                                { cerTitle, cerAuthority, cerDate, cerExpire },
                                index
                            ) => (
                                <div key={index} className="space-y-2.5">
                                    <p className="text-lg font-medium text-black">
                                        {cerTitle}
                                    </p>
                                    <div className="text-gray01 space-y-1 text-sm">
                                        <p>{cerAuthority}</p>
                                        <div className="flex items-center space-x-1">
                                            <p>{formatDate(cerDate)}</p>
                                            {cerExpire && (
                                                <>
                                                    <span>&#126;</span>
                                                    <p>
                                                        {formatDate(cerExpire)}
                                                    </p>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                )}
                {resumeEducation && (
                    <div className="border-gray03 space-y-7.5 border-t-1 border-solid">
                        <h4 className="text-xl font-semibold text-black">
                            교육
                        </h4>
                        {resumeEducation.map(
                            (
                                {
                                    eduTitle,
                                    eduOrgan,
                                    eduContent,
                                    eduTime,
                                    eduStartDate,
                                    eduEndDate,
                                },
                                index
                            ) => (
                                <div key={index} className="space-y-2.5">
                                    <p className="text-lg font-medium text-black">
                                        {eduTitle}
                                    </p>
                                    <div className="text-gray01 space-y-1 text-sm">
                                        <div className="edu_info flex items-center space-x-2">
                                            <p>{eduOrgan}</p>
                                            <span>&#124;</span>
                                            <p>{eduTime}시간</p>
                                        </div>
                                        <div className="edu_date flex items-center space-x-1">
                                            <p>{formatDate(eduStartDate)}</p>
                                            <span>&#126;</span>
                                            <p>{formatDate(eduEndDate)}</p>
                                        </div>
                                        <p>{eduContent}</p>
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResumeForm;
