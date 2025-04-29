import axiosInstance from "./axiosInstance";

export const getUserInfo = async () => {
    const { data } = await axiosInstance.get("/himatch/member/info");

    return data;
};
