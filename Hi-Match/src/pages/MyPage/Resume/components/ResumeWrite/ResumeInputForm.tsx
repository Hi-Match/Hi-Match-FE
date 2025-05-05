import ImageUploadInput from "./ImageUploadInput";
import ProfileInfoInput from "./ProfileInfoInput";

const ResumeInputForm = () => {
    return (
        <div className="rounded-[10px] border-1 border-solid border-gray-50 p-12.5 shadow-sm">
            <div className="user_profile_wrapper">
                <div className="user_profile flex">
                    <ImageUploadInput />
                    <div className="user_info_wrapper flex-grow space-y-12.5 pl-12.5">
                        <ProfileInfoInput />
                    </div>
                </div>
                <div className="user_ambition"></div>
            </div>
        </div>
    );
};

export default ResumeInputForm;
