import axiosInstance from "@/apis/axiosInstance";
import { formatDate } from "@/utils/dateFormat";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { formatPhoneNumber } from "@/utils/phoneFormat";
import { useState } from "react";
import ProfileIcon from "@/assets/icons/profile-icon.svg?react";
import ResumeDeleteModal from "../ResumeList/ResumeDeleteModal";
import toast from "react-hot-toast";
import { formatGPA } from "@/utils/GPAFormat";

const ResumeForm = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const navigate = useNavigate();

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

    const handleClickResumeEdit = () => {
        navigate(`/mypage/resume/edit/${resumeNo}`);
    };

    const handleClickDelete = () => {
        setIsModalOpen(true);
    };

    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: () =>
            axiosInstance.delete(`/himatch/resume/delete?resumeNo=${resumeNo}`),
        onSuccess: () => {
            toast.success("이력서가 삭제되었습니다.");
            setIsModalOpen(false);
            queryClient.invalidateQueries({ queryKey: ["resume-list"] });
            navigate("/mypage/resume");
        },
        onError: () => {
            toast.error("이력서 삭제에 실패했습니다. 다시 시도해 주세요.");
        },
    });

    const handleClickResumeDelete = () => {
        mutate();
    };

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

    return (
        <div className="resume_form_wrapper">
            <div className="title_wrapper mb-7.5 flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-black">
                    {resumeTitle}
                </h2>
                <div className="btn_wrapper space-x-2.5">
                    <button
                        type="button"
                        className="btn-gray text-gray01 h-10 w-25"
                        onClick={handleClickDelete}
                    >
                        삭제
                    </button>
                    <button
                        type="button"
                        className="btn-white h-10 w-25"
                        onClick={handleClickResumeEdit}
                    >
                        수정
                    </button>
                </div>
            </div>
            <div className="rounded-[10px] border-1 border-solid border-gray-50 p-12.5 shadow-sm [&>div:not(:first-child)]:py-12.5">
                <div className="[&>div:not(:first-child)]:py-12.5">
                    <div className="user_profile_wrapper">
                        <div className="user_profile flex">
                            <div className="profile_image border-gray03 flex h-62.5 w-48 items-center rounded-[5px] border-1 border-solid">
                                {resumeIMG ? (
                                    <img
                                        src={resumeIMG}
                                        alt="이력서 사진"
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <ProfileIcon className="h-auto w-40 fill-blue-100" />
                                )}
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
                    {resumeArmyType &&
                        resumeDisabilityType &&
                        resumeRewardingPatriotism && (
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
                                                <p>
                                                    {formatDate(
                                                        resumeArmyDate ?? ""
                                                    )}
                                                </p>
                                                <span>&#126;</span>
                                                <p>
                                                    {formatDate(
                                                        resumeArmyEnd ?? ""
                                                    )}
                                                </p>
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
                                            <p className="text-gray01">
                                                보훈번호
                                            </p>
                                            <p>{resumeRewardingPatriotism}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                </div>
                <div className="border-gray03 space-y-7.5 border-t-1 border-solid">
                    <h4 className="text-xl font-semibold text-black">학력</h4>
                    {resumeSchool.map(
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
                {0 < (resumeExperience ?? [])?.length && (
                    <div className="border-gray03 space-y-7.5 border-t-1 border-solid">
                        <h4 className="text-xl font-semibold text-black">
                            경력
                        </h4>
                        {(resumeExperience ?? []).map(
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
                {0 < (resumeAward ?? [])?.length && (
                    <div className="border-gray03 space-y-7.5 border-t-1 border-solid">
                        <h4 className="text-xl font-semibold text-black">
                            수상 내역
                        </h4>
                        {(resumeAward ?? []).map(
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
                {0 < (resumeCertificate ?? [])?.length && (
                    <div className="border-gray03 space-y-7.5 border-t-1 border-solid">
                        <h4 className="text-xl font-semibold text-black">
                            자격증
                        </h4>
                        {(resumeCertificate ?? []).map(
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
                {0 < (resumeEducation ?? [])?.length && (
                    <div className="border-gray03 space-y-7.5 border-t-1 border-solid">
                        <h4 className="text-xl font-semibold text-black">
                            교육
                        </h4>
                        {(resumeEducation ?? []).map(
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
            <ResumeDeleteModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleClickResumeDelete}
            />
        </div>
    );
};

export default ResumeForm;
