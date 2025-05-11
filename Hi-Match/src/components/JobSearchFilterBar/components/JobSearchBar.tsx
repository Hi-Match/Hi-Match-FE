import SearchIcon from "@/assets/icons/search-icon.svg?react";

interface JobSearchBarProps {
    value: string;
    onChange: (value: string) => void;
    onSearch: () => void;
}

const JobSearchBar = ({ value, onChange, onSearch }: JobSearchBarProps) => (
    <div className="flex items-center gap-2">
        <input
            className="w-full rounded border px-4 py-2"
            placeholder="회사/공고 키워드로 검색"
            value={value}
            onChange={e => onChange(e.target.value)}
            onKeyDown={e => e.key === "Enter" && onSearch()}
        />
        <SearchIcon />
    </div>
);
export default JobSearchBar;
