import { getBizInfo } from "@/apis/biz";
import { useBizStore } from "@/store/bizStore";
import { formatDate } from "@/utils/dateFormat";
import { useQueryClient } from "@tanstack/react-query";

export const useBizInfo = () => {
    const queryClient = useQueryClient();

    const fetchAndStoreBiz = async () => {
        const bizInfo = await queryClient.fetchQuery({
            queryKey: ["bizInfo"],
            queryFn: getBizInfo,
        });

        useBizStore.getState().login({
            memberID: bizInfo.memberID,
            memberMail: bizInfo.memberMail,
            memberName: bizInfo.memberName,
            memberPhone: btoa(JSON.stringify(bizInfo.memberPhone)),
            memberJoinDate: formatDate(bizInfo.memberJoinDate),
        });
    };

    return { fetchAndStoreBiz };
};
