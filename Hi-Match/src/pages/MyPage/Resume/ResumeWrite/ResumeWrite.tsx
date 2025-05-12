import { useEffect, useState } from "react";
import ResumeInputForm from "../components/ResumeWrite/Form/ResumeInputForm";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/apis/axiosInstance";
import toast from "react-hot-toast";
import { isEmptyObject, isEmptySchool } from "@/utils/emptyObject";
import { getToday } from "@/utils/dateFormat";
import { useUserStore } from "@/store/userStore";

const ResumeWrite = () => {
    const [resumeData, setResumeData] = useState<ResumeDetailData>({
        resumeDate: getToday(),
        resumeTitle: "",
        resumeName: "",
        resumeEngName: "",
        resumeMail: "",
        resumeTel: "",
        resumeAddress: "",
        resumeBirthDay: "",
        resumeGender: "",
        resumeIMG: "",
        resumePortFolio: "",
        resumeAmbition: "",
        resumeArmyType: "",
        resumeArmyPart: "",
        resumeArmyDate: "",
        resumeArmyEnd: "",
        resumeDisability: "",
        resumeDisabilityType: "",
        resumeRewardingPatriotism: "",
        resumeSchool: [],
        resumeExperience: [],
        resumeCertificate: [],
        resumeEducation: [],
        resumeAward: [],
    });

    const navigate = useNavigate();

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

    const { mutate } = useMutation({
        mutationFn: (formData: ResumeDetailData) =>
            axiosInstance.post("/himatch/resume/register", formData),
        onSuccess: () => {
            navigate("/mypage/resume");
        },
        onError: () => {
            toast.error("이력서 저장에 실패했습니다. 다시 시도해 주세요.");
        },
    });

    const { user } = useUserStore();

    const handleClickResumeSave = () => {
        const cleanedResumeData = {
            ...resumeData,
            resumeTitle:
                resumeData.resumeTitle.trim() === ""
                    ? `${user?.memberName}님의 이력서`
                    : resumeData.resumeTitle,
            resumeSchool: (resumeData.resumeSchool ?? [])
                .filter(school => !isEmptySchool(school))
                .map(school => ({
                    ...school,
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
            resumeExperience: (resumeData.resumeExperience ?? []).filter(
                exp => !isEmptyObject(exp)
            ),
            resumeCertificate: (resumeData.resumeCertificate ?? []).filter(
                cer => !isEmptyObject(cer)
            ),
            resumeAward: (resumeData.resumeAward ?? []).filter(
                award => !isEmptyObject(award)
            ),
            resumeEducation: (resumeData.resumeEducation ?? []).filter(
                edu => !isEmptyObject(edu)
            ),
        };

        mutate(cleanedResumeData);
    };

    const isResumeValid = (data: ResumeDetailData): boolean => {
        return (
            data.resumeName.trim() !== "" &&
            data.resumeEngName.trim() !== "" &&
            data.resumeMail.trim() !== "" &&
            data.resumeTel.trim() !== "" &&
            data.resumeAddress.trim() !== "" &&
            data.resumeBirthDay.trim() !== "" &&
            data.resumeArmyType !== "" &&
            data.resumeGender !== "" &&
            data.resumeSchool.length > 0 &&
            data.resumeSchool.some(school => !isEmptySchool(school))
        );
    };

    return (
        <div className="resume_write_wrapper">
            <div className="flex justify-center">
                <div className="w-210">
                    <h2 className="mb-2.5 text-lg font-medium text-black">
                        이력서 작성
                    </h2>
                    <div className="title_wrapper mb-7.5">
                        <input
                            id="title"
                            type="text"
                            className="w-full text-2xl font-semibold text-black focus:outline-none"
                            value={resumeData.resumeTitle}
                            placeholder="제목을 작성해 주세요."
                            maxLength={30}
                            onChange={handleChangeTitle}
                        />
                    </div>
                    <ResumeInputForm
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
                        className={`h-10 w-25 text-base ${!isResumeValid(resumeData) ? "btn-disabled" : "btn-blue"}`}
                        onClick={handleClickResumeSave}
                        disabled={!isResumeValid(resumeData)}
                    >
                        저장
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ResumeWrite;
