import { useState } from "react";
import { useApplicationData } from "@/hooks/application/useApplicationData";
import AppIndex from "./components/AppIndex";
import ApplicationTable from "./components/ApplicationTable";
import SearchBar from "./components/SearchBar";

const indexList = [
    { key: "total", label: "전체" },
    { key: "submit", label: "지원 완료" },
    { key: "progress", label: "서류 검토중" },
    { key: "resumePass", label: "서류 합격" },
    { key: "finalPass", label: "최종 합격" },
    { key: "fail", label: "불합격" },
];

const Application = () => {
    const [selectedIndex, setSelectedIndex] = useState("total");
    const [page, setPage] = useState(1);

    const { counts, list, loading } = useApplicationData(selectedIndex, page);

    const handleIndexChange = (key: string) => {
        setSelectedIndex(key);
        setPage(1);
    };

    return (
        <div className="mx-auto flex w-full max-w-[1080px] flex-col gap-14 px-15">
            <h2 className="text-3xl font-semibold text-black mb-8">
                지원 공고 현황 📝
            </h2>
            <AppIndex
                indexList={indexList}
                selectedIndex={selectedIndex}
                onChange={handleIndexChange}
                counts={counts}
            />
            <div className="flex flex-col gap-4">
                <SearchBar />
                <ApplicationTable data={list} loading={loading} />
            </div>
        </div>
    );
};

export default Application;
