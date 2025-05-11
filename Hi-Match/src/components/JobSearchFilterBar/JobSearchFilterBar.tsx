import JobSearchBar from "./components/JobSearchBar";
import JobFilterSelect from "./components/JobFilterSelect";
import PersonIcon from "@/assets/icons/person-icon.svg?react";
import LocationIcon from "@/assets/icons/location-icon.svg?react";
import JobIcon from "@/assets/icons/job-icon.svg?react";
import GraduationCapIcon from "@/assets/icons/graduation-cap-icon.svg?react";
import { JOB_PARTS } from "@/constants/jobParts";
import { REGIONS } from "@/constants/regions";
import { EDUCATIONS } from "@/constants/educations";
import { EMPLOYMENT_TYPES } from "@/constants/employmentTypes";
import JobFilterCascadingSelect from "./components/JobFilterCascadingSelect";

interface JobSearchFilterBarProps {
    searchValue: string;
    onSearchChange: (value: string) => void;
    onSearch: () => void;
    jobType: string;
    onJobTypeChange: (value: string) => void;
    region: { region: string; district: string };
    onRegionChange: (value: { region: string; district: string }) => void;
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
}: JobSearchFilterBarProps) => {
    return (
        <div className="flex w-full items-center gap-4 rounded-lg bg-white px-4 py-2 shadow">
            <JobSearchBar
                value={searchValue}
                onChange={onSearchChange}
                onSearch={onSearch}
            />
            <JobFilterSelect
                icon={<JobIcon />}
                label="직군 · 직무"
                options={JOB_PARTS}
                value={jobType}
                onChange={onJobTypeChange}
            />
            <JobFilterCascadingSelect
                icon={<LocationIcon />}
                options={REGIONS}
                value={region}
                onChange={onRegionChange}
            />
            <JobFilterSelect
                icon={<GraduationCapIcon />}
                label="학력"
                options={EDUCATIONS}
                value={education}
                onChange={onEducationChange}
            />
            <JobFilterSelect
                icon={<PersonIcon />}
                label="고용형태"
                options={EMPLOYMENT_TYPES}
                value={employmentType}
                onChange={onEmploymentTypeChange}
            />
        </div>
    );
};

export default JobSearchFilterBar;
