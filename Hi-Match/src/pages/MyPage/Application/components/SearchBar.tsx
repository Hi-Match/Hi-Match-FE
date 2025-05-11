import { useState } from "react";

interface SearchBarProps {
    onSearch: (keyword: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
    const [keyword, setKeyword] = useState("");
    return (
        <div className="flex w-full justify-end gap-2">
            <input
                className="w-[250px] rounded-md border border-gray-300 p-2 text-sm placeholder:text-gray-400"
                type="text"
                placeholder="키워드로 검색하기"
                value={keyword}
                onChange={e => setKeyword(e.target.value)}
                onKeyDown={e => e.key === "Enter" && onSearch(keyword)}
            />
        </div>
    );
};

export default SearchBar;
