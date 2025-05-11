import JobSearchBar from "./components/JobSearchBar";
import JobFilterSelect from "./components/JobFilterSelect";
import PersonIcon from "@/assets/icons/person-icon.svg?react";
import LocationIcon from "@/assets/icons/location-icon.svg?react";
import JobIcon from "@/assets/icons/job-icon.svg?react";
import GraduationCapIcon from "@/assets/icons/graduation-cap-icon.svg?react";

interface JobSearchFilterBarProps {
    searchValue: string;
    onSearchChange: (value: string) => void;
    onSearch: () => void;
    jobType: string;
    onJobTypeChange: (value: string) => void;
    region: string;
    onRegionChange: (value: string) => void;
    education: string;
    onEducationChange: (value: string) => void;
    employmentType: string;
    onEmploymentTypeChange: (value: string) => void;
}

const JobSearchFilterBar = ({
    searchValue,
    onSearchChange,
    onSearch,
    jobType,
    onJobTypeChange,
    region,
    onRegionChange,
    education,
    onEducationChange,
    employmentType,
    onEmploymentTypeChange,
}: JobSearchFilterBarProps) => (
    <div className="flex w-full items-center gap-4 rounded-lg bg-white px-4 py-2 shadow">
        <JobSearchBar
            value={searchValue}
            onChange={onSearchChange}
            onSearch={onSearch}
        />
        <JobFilterSelect
            icon={<JobIcon />}
            label="직군 · 직무"
            options={[]}
            value={jobType}
            onChange={onJobTypeChange}
        />
        <JobFilterSelect
            icon={<LocationIcon />}
            label="지역"
            options={[]}
            value={region}
            onChange={onRegionChange}
        />
        <JobFilterSelect
            icon={<GraduationCapIcon />}
            label="학력"
            options={[]}
            value={education}
            onChange={onEducationChange}
        />
        <JobFilterSelect
            icon={<PersonIcon />}
            label="고용형태"
            options={[]}
            value={employmentType}
            onChange={onEmploymentTypeChange}
        />
    </div>
);

export default JobSearchFilterBar;
