import { useState, useEffect } from "react";
import {
    getApplicationCount,
    getAllApplications,
    getSubmittedApplications,
    getProgressApplications,
    getResumePassApplications,
    getFinalPassApplications,
    getFailApplications,
    getApplicationPage,
} from "@/apis/application";

const apiMap: Record<string, (page: number) => Promise<ApplicationItem[]>> = {
    TOTAL: getAllApplications,
    SUBMIT: getSubmittedApplications,
    PROGRESS: getProgressApplications,
    RESUME_PASS: getResumePassApplications,
    FINAL_PASS: getFinalPassApplications,
    FAIL: getFailApplications,
};

const defaultCounts = {
    TOTAL: 0,
    SUBMIT: 0,
    PROGRESS: 0,
    RESUME_PASS: 0,
    FINAL_PASS: 0,
    FAIL: 0,
};

const keyMap: Record<string, keyof typeof defaultCounts> = {
    total: "TOTAL",
    submit: "SUBMIT",
    progress: "PROGRESS",
    resumePass: "RESUME_PASS",
    finalPass: "FINAL_PASS",
    fail: "FAIL",
};

export const useApplicationData = (selectedIndex: string, page: number = 1) => {
    const [counts, setCounts] = useState({
        TOTAL: 0,
        SUBMIT: 0,
        PROGRESS: 0,
        RESUME_PASS: 0,
        FINAL_PASS: 0,
        FAIL: 0,
    });
    const [list, setList] = useState<ApplicationItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [maxPage, setMaxPage] = useState(1);

    useEffect(() => {
        getApplicationCount().then(rawCounts => {
            // 모든 key를 0으로 초기화
            const converted = { ...defaultCounts };
            // 응답값을 keyMap을 통해 변환해서 덮어쓰기
            Object.entries(rawCounts).forEach(([key, value]) => {
                const mappedKey = keyMap[key];
                if (mappedKey) {
                    converted[mappedKey] = Number(value);
                }
            });
            setCounts(converted);
        });
    }, []);

    useEffect(() => {
        setLoading(true);
        const fetchList = apiMap[selectedIndex] || getAllApplications;
        fetchList(page)
            .then(data => setList(data))
            .finally(() => setLoading(false));
        const category = keyMap[selectedIndex] || "TOTAL";
        getApplicationPage(category).then(setMaxPage);
    }, [selectedIndex, page]);

    return { counts, list, loading, maxPage };
};
