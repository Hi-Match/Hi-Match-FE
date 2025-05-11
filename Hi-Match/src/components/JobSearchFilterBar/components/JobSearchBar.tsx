import SearchIcon from "@/assets/icons/search-icon.svg?react";

interface JobSearchBarProps {
    value: string;
    onChange: (value: string) => void;
    onSearch: () => void;
}

const JobSearchBar = ({ value, onChange, onSearch }: JobSearchBarProps) => (
    <div className="flex w-full flex-1 items-center justify-center gap-4 px-4 py-2">
        <SearchIcon />

        <input
            className="w-full rounded border border-none px-2 py-1"
            placeholder="회사/공고 키워드로 검색"
            value={value}
            onChange={e => onChange(e.target.value)}
            onKeyDown={e => e.key === "Enter" && onSearch()}
        />
    </div>
);
export default JobSearchBar;
