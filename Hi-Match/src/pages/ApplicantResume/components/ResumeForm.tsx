import axiosInstance from "@/apis/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowLeftIcon from "@/assets/icons/arrow-left-icon.svg?react";
import { formatDate } from "@/utils/dateFormat";
import { formatGPA } from "@/utils/GPAFormat";
import ProfileIcon from "@/assets/icons/profile-icon.svg?react";
import { formatPhoneNumber } from "@/utils/phoneFormat";

const ResumeForm = () => {
    const { resumeNo } = useParams();

    const { data } = useQuery<ApplicantResumeData>({
        queryKey: ["applicant-resume", resumeNo],
        queryFn: async () => {
            const response = await axiosInstance.get<ApplicantResumeData>(
                `/himatch/application/company/apply-detail?applicationNo=${resumeNo}`
            );

            return response.data;
        },
    });

    const navigate = useNavigate();

    const handleClickBack = () => {
        navigate(-1);
    };

    if (!data) return null;

    const {
        applicationMemberCode,
        applicationMemberSuitability,
        applicationName,
        applicationEngName,
        applicationMail,
        applicationTel,
        applicationAddress,
        applicationBirthDay,
        applicationGender,
        applicationIMG,
        applicationPortFolio,
        applicationAmbition,
        applicationArmyType,
        applicationArmyPart,
        applicationArmyDate,
        applicationArmyEnd,
        applicationDisability,
        applicationDisabilityType,
        applicationRewardingPatriotism,
        applicationSchool,
        applicationExperience,
        applicationCertificate,
        applicationEducation,
        applicationAward,
    } = data;

    return (
        <div className="resume_form w-full space-y-7.5 rounded-[10px] border-1 border-solid border-gray-50 bg-white p-12.5 shadow-sm">
            <div className="flex items-center justify-between">
                <button
                    type="button"
                    className="cursor-pointer"
                    onClick={handleClickBack}
                >
                    <ArrowLeftIcon className="fill-gray01 h-6 w-6" />
                </button>
            </div>
            {applicationMemberCode && applicationMemberSuitability && (
                <div className="border-gray03 grid grid-cols-2 items-center space-x-2 border-y-1 border-solid py-7.5">
                    {applicationMemberCode && (
                        <div className="flex-center border-gray03 space-x-4 border-r-2 border-solid">
                            <span className="text-xl font-semibold text-black">
                                인성검사 결과
                            </span>
                            <span className="flex-center h-10 rounded-3xl bg-blue-400 px-4 text-lg font-semibold text-white">
                                {applicationMemberCode}
                            </span>
                        </div>
                    )}
                    {applicationMemberSuitability && (
                        <>
                            {applicationMemberSuitability === "적합" ? (
                                <span className="flex-center h-10 rounded-3xl border-2 border-solid border-blue-400 px-4 text-lg font-bold text-blue-400">
                                    적합
                                </span>
                            ) : (
                                <span className="flex-center h-10 rounded-3xl border-2 border-solid border-red-400 px-4 text-lg font-bold text-red-400">
                                    부적합
                                </span>
                            )}
                        </>
                    )}
                </div>
            )}
            <div className="p-12.5 [&>div:not(:first-child)]:py-12.5">
                <div className="[&>div:not(:first-child)]:py-12.5">
                    <div className="user_profile_wrapper">
                        <div className="user_profile flex">
                            <div className="profile_image border-gray03 flex-center h-62.5 w-48 rounded-[5px] border-1 border-solid">
                                {applicationIMG ? (
                                    <img
                                        src={applicationIMG}
                                        alt="이력서 사진"
                                        className="h-full w-full rounded-[5px] object-cover"
                                    />
                                ) : (
                                    <ProfileIcon className="h-auto w-40 fill-blue-100" />
                                )}
                            </div>
                            <div className="user_info_wrapper flex-grow px-12.5">
                                <div className="user_name mb-7.5 flex items-center space-x-2.5">
                                    <p className="text-[28px] font-semibold text-black">
                                        {applicationName}
                                    </p>
                                    <p className="text-gray01">
                                        {applicationEngName}
                                    </p>
                                </div>
                                <div className="user_info space-y-2.5">
                                    <div className="user_email flex items-center [&>p:first-child]:w-18">
                                        <p className="text-gray01">생년월일</p>
                                        <p className="font-medium text-black">
                                            {applicationBirthDay}
                                        </p>
                                    </div>
                                    {applicationGender && (
                                        <div className="user_email flex items-center [&>p:first-child]:w-18">
                                            <p className="text-gray01">성별</p>
                                            <p className="font-medium text-black">
                                                {applicationGender === "M"
                                                    ? "남"
                                                    : "여"}
                                            </p>
                                        </div>
                                    )}
                                    <div className="user_email flex items-center [&>p:first-child]:w-18">
                                        <p className="text-gray01">이메일</p>
                                        <p className="font-medium text-black">
                                            {applicationMail}
                                        </p>
                                    </div>
                                    <div className="user_phone flex items-center [&>p:first-child]:w-18">
                                        <p className="text-gray01">연락처</p>
                                        <p className="font-medium text-black">
                                            {formatPhoneNumber(applicationTel)}
                                        </p>
                                    </div>
                                    <div className="user_address flex items-center [&>p:first-child]:w-18">
                                        <p className="text-gray01">주소</p>
                                        <p className="font-medium text-black">
                                            {applicationAddress}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {applicationAmbition && (
                            <div className="user_ambition py-12.5">
                                <p className="text-base whitespace-pre-line text-black">
                                    {applicationAmbition}
                                </p>
                            </div>
                        )}
                    </div>
                    {applicationPortFolio && (
                        <div className="user_portfolio border-gray03 flex items-center space-x-7.5 border-t-1 border-solid">
                            <h4 className="text-xl font-semibold text-black">
                                포트폴리오
                            </h4>
                            <Link
                                to={applicationPortFolio}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline"
                            >
                                {applicationPortFolio}
                            </Link>
                        </div>
                    )}
                    {applicationArmyType &&
                        applicationDisabilityType &&
                        applicationRewardingPatriotism && (
                            <div className="border-gray03 space-y-7.5 border-t-1 border-solid">
                                {applicationArmyType === "대상" && (
                                    <div className="space-y-7.5">
                                        <h4 className="text-xl font-semibold text-black">
                                            병역사항
                                        </h4>
                                        <div className="edu_info flex items-center space-x-2">
                                            <p>{applicationArmyPart}</p>
                                            <span>&#124;</span>
                                            <div className="army_date flex items-center space-x-1">
                                                <p>
                                                    {formatDate(
                                                        applicationArmyDate ??
                                                            ""
                                                    )}
                                                </p>
                                                <span>&#126;</span>
                                                <p>
                                                    {formatDate(
                                                        applicationArmyEnd ?? ""
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {applicationDisabilityType &&
                                    applicationDisability && (
                                        <div className="space-y-7.5">
                                            <h4 className="text-xl font-semibold text-black">
                                                장애사항
                                            </h4>
                                            <div className="edu_info flex items-center space-x-2">
                                                <p>
                                                    {applicationDisabilityType}
                                                </p>
                                                <span>&#124;</span>
                                                <p>{applicationDisability}</p>
                                            </div>
                                        </div>
                                    )}
                                {applicationRewardingPatriotism && (
                                    <div className="space-y-7.5">
                                        <h4 className="text-xl font-semibold text-black">
                                            보훈사항
                                        </h4>
                                        <div className="flex items-center [&>p:first-child]:w-18">
                                            <p className="text-gray01">
                                                보훈번호
                                            </p>
                                            <p>
                                                {applicationRewardingPatriotism}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                </div>
                <div className="border-gray03 space-y-7.5 border-t-1 border-solid">
                    <h4 className="text-xl font-semibold text-black">학력</h4>
                    {applicationSchool.map(
                        (
                            {
                                schoolName,
                                schoolMajor,
                                schoolMinor,
                                schoolMultiple,
                                schoolDegree,
                                schoolGPA,
                                schoolStandardGPA,
                                schoolPart,
                                schoolGraduationDate,
                                schoolAdmissionDate,
                            },
                            index
                        ) => (
                            <div key={index} className="space-y-2.5">
                                <p className="text-lg font-medium text-black">
                                    {schoolName}
                                </p>
                                <div className="text-gray01 space-y-1 text-sm">
                                    <div className="edu_info flex items-center space-x-2">
                                        <p>{schoolPart}</p>
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
                                    {schoolMinor && (
                                        <div className="edu_info flex items-center space-x-1">
                                            <p>부전공</p>
                                            <span>&#58;</span>
                                            <p>{schoolMinor}</p>
                                        </div>
                                    )}
                                    {schoolMultiple && (
                                        <div className="edu_info flex items-center space-x-1">
                                            <p>복수전공</p>
                                            <span>&#58;</span>
                                            <p>{schoolMultiple}</p>
                                        </div>
                                    )}
                                    <div className="school_date flex items-center space-x-1">
                                        <p>{formatDate(schoolAdmissionDate)}</p>
                                        {schoolPart !== "검정고시" && (
                                            <>
                                                {schoolGraduationDate ? (
                                                    <>
                                                        <span>&#126;</span>
                                                        <p>
                                                            {formatDate(
                                                                schoolGraduationDate
                                                            )}
                                                        </p>
                                                    </>
                                                ) : (
                                                    <>
                                                        <span>&#126;</span>
                                                        <p>재학중</p>
                                                    </>
                                                )}
                                            </>
                                        )}
                                    </div>
                                    {schoolGPA && schoolStandardGPA && (
                                        <div className="school_gpa flex items-center space-x-1">
                                            <p>{formatGPA(schoolGPA)}</p>
                                            <span>&#47;</span>
                                            <p>{schoolStandardGPA}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    )}
                </div>
                {0 < (applicationExperience ?? [])?.length && (
                    <div className="border-gray03 space-y-7.5 border-t-1 border-solid">
                        <h4 className="text-xl font-semibold text-black">
                            경력
                        </h4>
                        {(applicationExperience ?? []).map(
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
                                                <p>
                                                    {formatDate(
                                                        expEndDate ?? ""
                                                    )}
                                                </p>
                                            )}
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <p>{expPosition}</p>
                                            <span>&#124;</span>
                                            <p>{expPart}</p>
                                        </div>
                                        <p>{expAchievement}</p>
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                )}
                {0 < (applicationAward ?? [])?.length && (
                    <div className="border-gray03 space-y-7.5 border-t-1 border-solid">
                        <h4 className="text-xl font-semibold text-black">
                            수상 내역
                        </h4>
                        {(applicationAward ?? []).map(
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
                {0 < (applicationCertificate ?? [])?.length && (
                    <div className="border-gray03 space-y-7.5 border-t-1 border-solid">
                        <h4 className="text-xl font-semibold text-black">
                            자격증
                        </h4>
                        {(applicationCertificate ?? []).map(
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
                {0 < (applicationEducation ?? [])?.length && (
                    <div className="border-gray03 space-y-7.5 border-t-1 border-solid">
                        <h4 className="text-xl font-semibold text-black">
                            교육
                        </h4>
                        {(applicationEducation ?? []).map(
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
