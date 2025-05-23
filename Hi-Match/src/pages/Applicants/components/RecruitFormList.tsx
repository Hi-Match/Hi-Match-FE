import axiosInstance from "@/apis/axiosInstance";
import { useQueries } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ArrowLeftIcon from "@/assets/icons/angle-left-icon.svg?react";
import ArrowRightIcon from "@/assets/icons/angle-right-icon.svg?react";
import { useEffect, useState } from "react";
import RecruitForm from "./RecruitForm";
import { useRecruitStore } from "@/store/recruitStore";

interface RecruitFormData {
    postingNo: number;
    postingTitle: string;
    postingPart: string;
}

const RecruitFormList = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const { selectedPostNo, setSelectedPostNo } = useRecruitStore();

    const getItemsPerSlide = () => {
        const width = window.innerWidth;

        if (width >= 1280) {
            return 5;
        } else if (width >= 1024) {
            return 4;
        } else if (width >= 768) {
            return 3;
        } else {
            return 2;
        }
    };

    const [itemsPerSlide, setItemsPerSlide] = useState(getItemsPerSlide());

    useEffect(() => {
        const handleResize = () => {
            setItemsPerSlide(getItemsPerSlide());
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // 채용 공고 가져오기
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
                queryKey: ["recruit-list"],
                queryFn: async (): Promise<RecruitFormData[]> => {
                    const response = await axiosInstance.get(
                        "/himatch/application/company/posting-list"
                    );

                    return response.data;
                },
            },
        ],
    });

    const companyInfo = results[0].data;
    const recruitFormData = results[1].data;
    const companyImage = companyInfo?.companyImgA ?? "";

    const isLoading = results.some(result => result.isLoading);
    const isError = results.some(result => result.isError);

    useEffect(() => {
        if (selectedPostNo && recruitFormData) {
            const index = recruitFormData.findIndex(
                item => item.postingNo === selectedPostNo
            );
            if (index !== -1) {
                setCurrentIndex(Math.floor(index / itemsPerSlide));
            }
        }
    }, [selectedPostNo, recruitFormData]);

    if (isLoading) return null;
    if (isError) {
        toast.error(
            "채용 공고를 불러오는 데 실패했습니다. 다시 시도해 주세요."
        );

        return null;
    }

    const totalSlides = Math.ceil(
        (recruitFormData ?? []).length / itemsPerSlide
    );

    const handleClickPrev = () => {
        if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
    };

    const handleClickNext = () => {
        if (currentIndex < totalSlides - 1) setCurrentIndex(currentIndex + 1);
    };

    const handleClick = (postingNo: number) => {
        setSelectedPostNo(postingNo);
    };

    return (
        <div className="recruit_form_list space-y-7.5 overflow-x-hidden">
            <div className="title flex items-center justify-between">
                <h3 className="text-xl font-semibold text-black">
                    채용중인 공고
                </h3>
                <div className="btn_wrapper">
                    <button
                        type="button"
                        className="border-gray03 cursor-pointer rounded-r-none border-1 border-r-0 border-solid bg-white p-1"
                        onClick={handleClickPrev}
                        disabled={currentIndex === 0}
                    >
                        <ArrowLeftIcon
                            className={`h-6 w-6 ${currentIndex === 0 ? "fill-gray03" : "fill-gray01"}`}
                        />
                    </button>
                    <button
                        type="button"
                        className="border-gray03 cursor-pointer rounded-l-none border-1 border-solid bg-white p-1"
                        onClick={handleClickNext}
                        disabled={
                            currentIndex >=
                            Math.ceil(
                                (recruitFormData?.length ?? 0) / itemsPerSlide
                            ) -
                                1
                        }
                    >
                        <ArrowRightIcon
                            className={`fill-gray01 h-6 w-6 ${currentIndex === totalSlides - 1 ? "fill-gray03" : "fill-gray01"}`}
                        />
                    </button>
                </div>
            </div>
            <div className="relative transition-transform duration-300 ease-in-out">
                <ul
                    className="flex h-60 max-w-345 flex-row items-center gap-5"
                    style={{
                        transform: `translateX(-${currentIndex * 18.45 * itemsPerSlide}rem)`,
                        transition: "transform 0.4s ease",
                    }}
                >
                    {(recruitFormData ?? []).map(
                        ({ postingNo, postingTitle, postingPart }, index) => (
                            <li
                                key={index}
                                className="recruit_form_wrapper w-69 min-w-69"
                            >
                                <RecruitForm
                                    postingNo={postingNo}
                                    postingTitle={postingTitle}
                                    postingPart={postingPart}
                                    companyImage={companyImage}
                                    onClick={handleClick}
                                    isSelected={selectedPostNo === postingNo}
                                />
                            </li>
                        )
                    )}
                </ul>
            </div>
        </div>
    );
};

export default RecruitFormList;
