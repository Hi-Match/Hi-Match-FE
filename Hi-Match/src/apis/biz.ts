import axiosInstance from "./axiosInstance";

export const getBizInfo = async () => {
    const { data } = await axiosInstance.get("/himatch/company/member/myhome");

    return data;
};
