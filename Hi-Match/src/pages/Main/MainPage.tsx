import MainLayout from "@/layout/MainLayout";
import { useJobPostings } from "@/hooks/application/useJobPostings";
import { useState } from "react";
import LatestJobSection from "./components/LatestJobSection";
import RecommendJobSection from "./components/RecommendJobSection";
import JobSearchFilterBar from "@/components/JobSearchFilterBar/JobSearchFilterBar";

const MainPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState("");
    const [jobType, setJobType] = useState("");
    const [region, setRegion] = useState("");
    const [education, setEducation] = useState("");
    const [employmentType, setEmploymentType] = useState("");

    const { jobPostings, loading, error, maxPage } = useJobPostings({
        keyword: searchValue,
        page: currentPage,
        companyAddress: region ? [region] : [],
        companyPart: jobType ? [jobType] : [],
        companyType: employmentType ? [employmentType] : [],
        postingEducation: education ? [education] : [],
    });

    const handleSearch = () => {
        setCurrentPage(1); // 검색 시 첫 페이지로 이동
    };

    return (
        <MainLayout>
            <div className="mx-auto flex w-full max-w-[1272px] flex-col gap-20 pt-14 max-[1271px]:px-20">
                <JobSearchFilterBar
                    searchValue={searchValue}
                    onSearchChange={setSearchValue}
                    onSearch={handleSearch}
                    jobType={jobType}
                    onJobTypeChange={setJobType}
                    region={region}
                    onRegionChange={setRegion}
                    education={education}
                    onEducationChange={setEducation}
                    employmentType={employmentType}
                    onEmploymentTypeChange={setEmploymentType}
                />
                <RecommendJobSection />
                <LatestJobSection
                    jobPostings={jobPostings}
                    loading={loading}
                    error={error}
                    currentPage={currentPage}
                    maxPage={maxPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </MainLayout>
    );
};

export default MainPage;
