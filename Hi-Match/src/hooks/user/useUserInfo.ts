import { getUserInfo } from "@/apis/user";
import { useUserStore } from "@/store/userStore";
import { formatDate } from "@/utils/dateFormat";
import { useQueryClient } from "@tanstack/react-query";

export const useUserInfo = () => {
    const queryClient = useQueryClient();

    const fetchAndStore = async () => {
        const userInfo = await queryClient.fetchQuery({
            queryKey: ["userInfo"],
            queryFn: getUserInfo,
        });

        useUserStore.getState().login({
            memberID: userInfo.memberID,
            memberMail: userInfo.memberMail,
            memberName: userInfo.memberName,
            memberPhone: btoa(JSON.stringify(userInfo.memberPhone)),
            memberJoinDate: formatDate(userInfo.memberJoinDate),
            companyAddress: userInfo.companyAddress,
            companyPart: userInfo.companyPart,
            companyType: userInfo.companyType,
        });
    };

    return { fetchAndStore };
};
