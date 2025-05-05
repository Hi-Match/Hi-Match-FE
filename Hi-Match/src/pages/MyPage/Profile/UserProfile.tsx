import { useUserStore } from "@/store/userStore";
import ProfileForm from "./components/ProfileForm";

const UserProfile = () => {
    const { user } = useUserStore();

    return (
        <div className="profile_wrapper">
            <div className="w-156">
                <h2 className="mb-12.5 text-2xl font-semibold text-black">
                    {user?.memberName}님의 정보
                </h2>
                <ProfileForm />
            </div>
        </div>
    );
};

export default UserProfile;
