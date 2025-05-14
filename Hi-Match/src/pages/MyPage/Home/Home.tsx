import { useUserStore } from "@/store/userStore";
import BookmarkList from "./components/BookmarkList";
import PersonalityTest from "./components/PersonalityTest";
import ApplicationList from "./components/ApplicationList";
import ResumeList from "./components/ResumeList";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/apis/axiosInstance";

const UserHome = () => {
    const { data } = useQuery({
        queryKey: ["user-home"],
        queryFn: async () => {
            const response = await axiosInstance("/himatch/member/myhome");

            return response.data;
        },
    });

    const { user } = useUserStore();

    return (
        <section className="mx-auto flex w-full max-w-[1272px] flex-col gap-10 overflow-hidden py-14 max-[1399px]:px-20">
            <h2 className="text-3xl font-semibold text-black">
                {user?.memberName}님의 홈
            </h2>
            <div className="space-y-12.5">
                <BookmarkList
                    bookmarkList={data?.bookmark ?? []}
                    showBookmarkButton={false}
                />
                <PersonalityTest code={data?.code} />
                <ApplicationList application={data?.application ?? []} />
                <ResumeList resumeList={data?.resume ?? []} />
            </div>
        </section>
    );
};

export default UserHome;
