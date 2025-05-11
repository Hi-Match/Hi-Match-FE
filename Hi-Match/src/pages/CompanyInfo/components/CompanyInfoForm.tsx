import { useEffect } from "react";
import ImageUploadInput from "./ImageUploadInput";
import NameInput from "./NameInput";
import ManageNameInput from "./ManageNameInput";
import AddressInput from "./AddressInput";
import { useQueries } from "@tanstack/react-query";
import axiosInstance from "@/apis/axiosInstance";
import LicenseInput from "./LicenseInput";
import IndustryInput from "./IndustryInput";
import toast from "react-hot-toast";
import EmployeeInput from "./EmployeeInput";
import HomePageInput from "./HomePageInput";
import DescriptionInput from "./DescriptionInput";
import TagForm from "./TagForm";

interface CompanyInfoFormProps {
    companyInfo: CompanyInfo;
    setCompanyInfo: React.Dispatch<React.SetStateAction<CompanyInfo>>;
}

const CompanyInfoForm = ({
    companyInfo,
    setCompanyInfo,
}: CompanyInfoFormProps) => {
    const results = useQueries({
        queries: [
            {
                queryKey: ["company-info"],
                queryFn: async () => {
                    const response = await axiosInstance.get(
                        "/himatch/company/info/detail"
                    );

                    return response.data;
                },
            },
            {
                queryKey: ["license"],
                queryFn: async () => {
                    const response = await axiosInstance.get(
                        "/himatch/company/select-license"
                    );

                    return response.data;
                },
            },
        ],
    });

    const companyInfoData = results[0].data;
    const companyLicenseData = results[1].data;

    useEffect(() => {
        if (companyInfoData) {
            setCompanyInfo(prev => ({ ...prev, ...companyInfoData }));
        }
    }, [companyInfoData]);

    const updateInfo = (key: keyof CompanyInfo, value: string) => {
        setCompanyInfo(prev => {
            if (prev[key] === value) return prev;
            return { ...prev, [key]: value };
        });
    };

    const isLoading = results.some(result => result.isLoading);
    const isError = results.some(result => result.isError);

    if (isLoading) return null;
    if (isError) {
        toast.error(
            "기업 정보를 불러오는 데 실패했습니다. 다시 시도해 주세요."
        );

        return null;
    }

    return (
        <form className="company_info_form space-y-7.5">
            <div className="w-full space-y-7.5 rounded-[10px] border-1 border-solid border-gray-50 bg-white p-12.5 shadow-sm">
                <h3 className="mb-7.5 text-lg font-semibold text-black">
                    기업 정보 관리
                </h3>
                <div className="image_container flex items-start space-x-7.5">
                    <div className="w-1/4">
                        <ImageUploadInput
                            id="logo"
                            label="기업 로고"
                            image={companyInfo.companyLogo ?? ""}
                            setImage={image => updateInfo("companyLogo", image)}
                        />
                    </div>
                    <div className="flex w-3/4 space-x-7.5">
                        <div className="w-1/3">
                            <ImageUploadInput
                                id="image-a"
                                label="대표 이미지(필수 1개)"
                                image={companyInfo.companyImgA ?? ""}
                                setImage={image =>
                                    updateInfo("companyImgA", image)
                                }
                            />
                        </div>
                        <div className="w-1/3">
                            <ImageUploadInput
                                id="image-b"
                                image={companyInfo.companyImgB ?? ""}
                                setImage={image =>
                                    updateInfo("companyImgB", image)
                                }
                            />
                        </div>
                        <div className="w-1/3">
                            <ImageUploadInput
                                id="image-c"
                                image={companyInfo.companyImgC ?? ""}
                                setImage={image =>
                                    updateInfo("companyImgC", image)
                                }
                            />
                        </div>
                    </div>
                </div>
                <div className="input_wrapper w-181.5 space-y-7.5">
                    <div className="flex items-center space-x-7.5">
                        <NameInput
                            value={companyInfo.companyName ?? ""}
                            setName={name => updateInfo("companyName", name)}
                        />
                        <ManageNameInput
                            value={companyInfo.companyManagerName ?? ""}
                            setCEOName={manage =>
                                updateInfo("companyManagerName", manage)
                            }
                        />
                    </div>
                    <AddressInput
                        value={companyInfo.companyAddress ?? ""}
                        setAddress={add => updateInfo("companyAddress", add)}
                    />
                    <div className="flex flex-1/2">
                        <LicenseInput
                            value={companyLicenseData.licenseNumber ?? ""}
                        />
                    </div>
                    <div className="flex items-center space-x-7.5">
                        <IndustryInput
                            value={companyInfo.companyIndustry ?? ""}
                            setIndustry={industry =>
                                updateInfo("companyIndustry", industry)
                            }
                        />
                        <EmployeeInput
                            value={companyInfo.companyEmployee}
                            setEmployee={employee =>
                                updateInfo("companyEmployee", employee)
                            }
                        />
                    </div>
                    <DescriptionInput
                        value={companyInfo.companyDescription}
                        setDescription={descripton =>
                            updateInfo("companyDescription", descripton)
                        }
                    />
                    <HomePageInput
                        value={companyInfo.companyURL}
                        setHomePage={url => updateInfo("companyURL", url)}
                    />
                </div>
            </div>
            <div className="w-full space-y-7.5 rounded-[10px] border-1 border-solid border-gray-50 bg-white p-12.5 shadow-sm">
                <div className="title mb-7.5 flex items-center space-x-2">
                    <h3 className="text-lg font-semibold text-black">
                        회사 태그 관리
                    </h3>
                    <p className="text-sm text-black">(최대 20개)</p>
                </div>
                <TagForm
                    tags={companyInfo.tag}
                    setTags={newTags =>
                        setCompanyInfo(prev => ({ ...prev, tag: newTags }))
                    }
                />
            </div>
        </form>
    );
};

export default CompanyInfoForm;
