import { useState, useEffect } from "react";
import { useApplicationData } from "@/hooks/application/useApplicationData";
import AppIndex from "./components/AppIndex";
import ApplicationTable from "./components/ApplicationTable";
import SearchBar from "./components/SearchBar";
import { useApplicationSearch } from "@/hooks/application/useApplicationSearch";
import { toast } from "react-hot-toast";
import Pagination from "@/components/Pagination/Pagination";

const indexList = [
    { key: "TOTAL", label: "전체" },
    { key: "SUBMIT", label: "지원 완료" },
    { key: "PROGRESS", label: "서류 검토중" },
    { key: "RESUME_PASS", label: "서류 합격" },
    { key: "FINAL_PASS", label: "최종 합격" },
    { key: "FAIL", label: "불합격" },
];

const Application = () => {
    const [selectedIndex, setSelectedIndex] = useState("TOTAL");
    const [page, setPage] = useState(1);
    const [searchKeyword, setSearchKeyword] = useState("");

    const { counts, list, loading, maxPage } = useApplicationData(
        selectedIndex,
        page
    );
    const {
        results,
        loading: searchLoading,
        error,
        search,
    } = useApplicationSearch(selectedIndex);

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);

    const handleIndexChange = (key: string) => {
        setSelectedIndex(key);
        setPage(1);
        setSearchKeyword("");
    };

    const handleSearch = (keyword: string) => {
        setSearchKeyword(keyword);
        search(keyword);
    };

    return (
        <div className="mx-auto flex w-full max-w-[1080px] flex-col gap-14 px-15">
            <h2 className="mb-8 text-3xl font-semibold text-black">
                지원 공고 현황 📝
            </h2>
            <AppIndex
                indexList={indexList}
                selectedIndex={selectedIndex}
                onChange={handleIndexChange}
                counts={counts}
            />
            <div className="flex flex-col gap-4">
                <SearchBar onSearch={handleSearch} />
                <ApplicationTable
                    data={searchKeyword ? results : list}
                    loading={searchKeyword ? searchLoading : loading}
                />
                <Pagination
                    currentPage={Number(page)}
                    totalPages={Number(maxPage)}
                    onPageChange={setPage}
                />
            </div>
        </div>
    );
};

export default Application;
