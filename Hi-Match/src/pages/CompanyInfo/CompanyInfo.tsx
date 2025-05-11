import { useEffect, useState } from "react";
import CompanyInfoForm from "./components/CompanyInfoForm";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/apis/axiosInstance";
import toast from "react-hot-toast";

const CompanyInfo = () => {
    const [companyInfo, setCompanyInfo] = useState<CompanyInfoData>({
        companyLogo: "",
        companyImgA: "",
        companyImgB: "",
        companyImgC: "",
        companyName: "",
        companyManagerName: "",
        companyAddress: "",
        companyPhone: "",
        companyMail: "",
        companyIndustry: "",
        companyEmployee: "",
        companyURL: "",
        companyDescription: "",
        tag: [],
    });

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

    const { mutate } = useMutation({
        mutationFn: (formData: CompanyInfoData) =>
            axiosInstance.post("/himatch/company/info/register", formData),
        onSuccess: () => {
            toast.success("저장이 완료 되었습니다.");
        },
        onError: () => {
            toast.error("저장에 실패했습니다. 다시 시도해 주세요.");
        },
    });

    const handleClickResumeSave = () => {
        mutate(companyInfo);
    };

    return (
        <div className="company_info mb-27.5 w-312">
            <CompanyInfoForm
                companyInfo={companyInfo}
                setCompanyInfo={setCompanyInfo}
            />
            <div className="fixed bottom-0 left-62.5 flex h-15 w-[calc(100%-250px)] items-center justify-end bg-white px-25 shadow-2xl">
                <div className="btn-wrapper">
                    <button
                        type="button"
                        className="btn-blue h-10 w-25 text-base"
                        onClick={handleClickResumeSave}
                    >
                        저장
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CompanyInfo;
