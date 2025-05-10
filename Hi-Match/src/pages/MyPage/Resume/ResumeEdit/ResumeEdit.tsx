import { useEffect, useState } from "react";
import ResumeEditForm from "../components/ResumeEdit/Form/ResumeEditForm";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/apis/axiosInstance";
import toast from "react-hot-toast";
import { isEmptyObject, isEmptySchool } from "@/utils/emptyObject";
import { useUserStore } from "@/store/userStore";
import { formatDateYMD, getToday } from "@/utils/dateFormat";
import { formatGPA } from "@/utils/GPAFormat";

const ResumeEdit = () => {
    const { resumeNo } = useParams();

    const { data } = useQuery({
        queryKey: ["resume-detail", resumeNo],
        queryFn: async () => {
            const response = await axiosInstance.get(
                `/himatch/resume/detail?resumeNo=${resumeNo}`
            );

            return response.data;
        },
        enabled: !!resumeNo, // resumeNo 없을 때는 요청하지 않음
    });

    const [resumeData, setResumeData] = useState<ResumeDetailData>(data);

    const navigate = useNavigate();

    useEffect(() => {
        if (!data) return;

        const formattedData: ResumeDetailData = {
            ...data,
            resumeSchool: (data.resumeSchool ?? []).map((school: any) => ({
                ...school,
                schoolGPA: formatGPA(school.schoolGPA),
                schoolStandardGPA: formatGPA(school.schoolStandardGPA),
            })),
            resumeExperience: data.resumeExperience ?? [],
            resumeCertificate: data.resumeCertificate ?? [],
            resumeAward: data.resumeAward ?? [],
            resumeEducation: data.resumeEducation ?? [],
        };

        setResumeData(formattedData);
    }, [data]);

    // 새로고침 시 window.confirm 호출
    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            event.preventDefault();
            event.returnValue = ""; // 브라우저에 따라 이 값은 무시되지만 필수
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);

    const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        setResumeData(prev => ({ ...prev, resumeTitle: value }));
    };

    const handleClickCancel = () => {
        if (window.confirm("변경사항이 저장되지 않을 수 있습니다.")) {
            navigate(-1);
        } else {
            return;
        }
    };

    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: (formData: ResumeDetailData) =>
            axiosInstance.put("/himatch/resume/modify", formData),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["resume-detail", resumeNo],
            });
            navigate(`/mypage/resume/${resumeNo}`);
            toast.success("이력서 수정이 완료되었습니다.");
        },
        onError: () => {
            toast.error("이력서 수정에 실패했습니다. 다시 시도해 주세요.");
        },
    });

    const { user } = useUserStore();

    const handleClickResumeEdit = () => {
        const cleanedResumeData = {
            ...resumeData,
            resumeNo: Number(resumeNo),
            resumeDate: getToday(),
            resumeTitle:
                resumeData.resumeTitle.trim() === ""
                    ? `${user?.memberName}님의 이력서`
                    : resumeData.resumeTitle,
            resumeSchool: (resumeData.resumeSchool ?? [])
                .filter(school => !isEmptySchool(school))
                .map(school => ({
                    ...school,
                    schoolAdmissionDate: formatDateYMD(
                        school.schoolAdmissionDate
                    ),
                    schoolGPA:
                        school.schoolGPA !== undefined &&
                        school.schoolGPA !== ""
                            ? parseFloat(school.schoolGPA as string)
                            : null,
                    schoolStandardGPA:
                        school.schoolStandardGPA !== undefined &&
                        school.schoolStandardGPA !== ""
                            ? parseFloat(school.schoolStandardGPA as string)
                            : null,
                })),
            resumeExperience: (resumeData.resumeExperience ?? [])
                .filter(exp => !isEmptyObject(exp))
                .map(exp => ({
                    ...exp,
                    expStartDate: formatDateYMD(exp.expStartDate),
                    expEndDate: formatDateYMD(exp.expEndDate ?? ""),
                })),
            resumeAward: (resumeData.resumeAward ?? [])
                .filter(award => !isEmptyObject(award))
                .map(award => ({
                    ...award,
                    awaDate: formatDateYMD(award.awaDate),
                })),
            resumeCertificate: (resumeData.resumeCertificate ?? [])
                .filter(cer => !isEmptyObject(cer))
                .map(cer => ({
                    ...cer,
                    cerDate: formatDateYMD(cer.cerDate),
                    cerExpire: formatDateYMD(cer.cerExpire),
                })),
            resumeEducation: (resumeData.resumeEducation ?? [])
                .filter(edu => !isEmptyObject(edu))
                .map(edu => ({
                    ...edu,
                    eduStartDate: formatDateYMD(edu.eduStartDate),
                    eduEndDate: formatDateYMD(edu.eduEndDate),
                })),
        };

        mutate(cleanedResumeData);
    };

    if (!data || !resumeData) return null;

    return (
        <div className="resume_write_wrapper">
            <div className="flex justify-center">
                <div className="w-210">
                    <h2 className="mb-2.5 text-lg font-medium text-black">
                        이력서 수정
                    </h2>
                    <div className="title_wrapper mb-7.5">
                        <input
                            id="title"
                            type="text"
                            className="w-full text-2xl font-semibold text-black focus:outline-none"
                            value={resumeData.resumeTitle ?? ""}
                            placeholder="제목을 작성해 주세요."
                            maxLength={30}
                            onChange={handleChangeTitle}
                        />
                    </div>
                    <ResumeEditForm
                        resumeData={resumeData}
                        setResumeData={setResumeData}
                    />
                </div>
            </div>
            <div className="fixed bottom-0 left-62.5 flex h-15 w-[calc(100%-250px)] items-center justify-end bg-white px-25 shadow-2xl">
                <div className="space-x-2.5">
                    <button
                        type="button"
                        className="btn-white h-10 w-25 text-base"
                        onClick={handleClickCancel}
                    >
                        취소
                    </button>
                    <button
                        type="button"
                        className="btn-blue h-10 w-25 text-base"
                        onClick={handleClickResumeEdit}
                    >
                        완료
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ResumeEdit;
