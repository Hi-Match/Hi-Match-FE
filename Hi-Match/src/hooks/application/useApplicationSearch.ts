import { useState } from "react";
import { searchApplications } from "@/apis/application";

export const useApplicationSearch = (selectedIndex: string) => {
    const [results, setResults] = useState<ApplicationItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const search = async (keyword: string, page: number = 1) => {
        setLoading(true);
        setError(null);
        try {
            const data = await searchApplications({
                keyword,
                category: selectedIndex,
                page,
            });
            setResults(data.list);
        } catch (err: unknown) {
            setError(
                err instanceof Error
                    ? err.message
                    : "검색 중 오류가 발생했습니다."
            );
        } finally {
            setLoading(false);
        }
    };

    return { results, loading, error, search };
};
