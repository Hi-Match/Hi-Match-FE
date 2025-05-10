import { useState, useEffect } from "react";
import {
    getApplicationCount,
    getAllApplications,
    getSubmittedApplications,
    getProgressApplications,
    getResumePassApplications,
    getFinalPassApplications,
    getFailApplications,
} from "@/apis/application";

const apiMap: Record<string, (page: number) => Promise<ApplicationItem[]>> = {
    total: getAllApplications,
    submit: getSubmittedApplications,
    progress: getProgressApplications,
    resumePass: getResumePassApplications,
    finalPass: getFinalPassApplications,
    fail: getFailApplications,
};

export const useApplicationData = (selectedIndex: string, page: number = 1) => {
    const [counts, setCounts] = useState({
        total: 0,
        submit: 0,
        progress: 0,
        resumePass: 0,
        finalPass: 0,
        fail: 0,
    });
    const [list, setList] = useState<ApplicationItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getApplicationCount().then(setCounts);
    }, []);

    useEffect(() => {
        setLoading(true);
        const fetchList = apiMap[selectedIndex] || getAllApplications;
        fetchList(page)
            .then(data => setList(data))
            .finally(() => setLoading(false));
    }, [selectedIndex, page]);

    return { counts, list, loading };
};
