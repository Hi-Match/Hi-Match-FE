import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBookmarkDelete } from "@/apis/bookmark";

export const useBookmarkDelete = () => {
    const queryClient = useQueryClient();

    const {
        mutate: handleDelete,
        isPending: isLoading,
        isError,
        error,
        isSuccess,
    } = useMutation({
        mutationFn: (bookMarkNo: number) => deleteBookmarkDelete(bookMarkNo),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
        },
    });

    return { handleDelete, isLoading, isError, error, isSuccess };
};