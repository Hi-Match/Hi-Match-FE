import { useState } from "react";
import { REGIONS } from "@/constants/regions";

interface JobFilterCascadingSelectProps {
    icon: React.ReactNode;
    options: typeof REGIONS;
    value: { region: string; district: string };
    onChange: (value: { region: string; district: string }) => void;
}

const JobFilterCascadingSelect = ({
    icon,
    value,
    onChange,
}: JobFilterCascadingSelectProps) => {
    const [selectedRegion, setSelectedRegion] = useState(value.region || "");
    const [selectedDistrict, setSelectedDistrict] = useState(
        value.district || ""
    );

    const handleRegionChange = (value: {
        region: string;
        district: string;
    }) => {
        setSelectedRegion(value.region);
        setSelectedDistrict(""); // 시/도 바뀌면 구/군 초기화
        onChange(value);
    };

    const handleDistrictChange = (district: string) => {
        setSelectedDistrict(district);
        onChange({ region: selectedRegion, district });
    };

    const regionObj = REGIONS.find(r => r.value === selectedRegion);

    return (
        <div className="flex gap-2">
            {icon}
            <select
                value={selectedRegion}
                onChange={e =>
                    handleRegionChange({ region: e.target.value, district: "" })
                }
            >
                <option value="">시/도 선택</option>
                {REGIONS.map(region => (
                    <option key={region.value} value={region.value}>
                        {region.label}
                    </option>
                ))}
            </select>
            <select
                value={selectedDistrict}
                onChange={e => handleDistrictChange(e.target.value)}
                disabled={!selectedRegion}
            >
                <option value="">구/군 선택</option>
                {regionObj?.districts.map(district => (
                    <option key={district.value} value={district.value}>
                        {district.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default JobFilterCascadingSelect;
