import { useState } from "react";
import ProfileIcon from "@/assets/icons/profile-icon.svg?react";
import toast from "react-hot-toast";

interface ImageUploadInputProps {
    onChange: (file: File) => void;
}

const ImageUploadInput = ({ onChange }: ImageUploadInputProps) => {
    const [profileImage, setProfileImage] = useState<string>("");

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (!file) return;

        if (profileImage) {
            URL.revokeObjectURL(profileImage);
        }

        // 업로드 가능한 파일 형식
        const allowedFiles = ["image/jpeg", "image/png"];
        const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

        if (MAX_FILE_SIZE < file.size) {
            toast.error("10MB 이하의 이미지만 업로드할 수 있습니다.");
            return;
        } else if (!allowedFiles.includes(file.type)) {
            toast.error("JPG, PNG 형식의 이미지 파일만 업로드할 수 있습니다.");
            return;
        } else {
            const imageUrl = URL.createObjectURL(file);

            setProfileImage(imageUrl);
            onChange(file);
        }
    };

    return (
        <div className="user_info grid-center">
            <div className="profile_image h-62.5 w-48">
                <label htmlFor="profileImage" className="cursor-pointer">
                    <div className="flex h-full w-full items-center overflow-hidden rounded-[5px] border-1 border-solid border-gray-200">
                        {profileImage === "" ? (
                            <div className="grid-center profile_upload space-y-5 p-2.5">
                                <ProfileIcon className="h-25 w-25 fill-gray-300" />
                                <div className="profile_info grid-center space-y-2">
                                    <p className="text-gray01 text-center text-sm break-keep">
                                        이력서에 사용할 이미지를 업로드 해
                                        주세요.
                                    </p>
                                    <p className="text-gray02 text-xs">
                                        가로 200px이상 &#40;10MB 이하&#41;
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <img
                                src={profileImage}
                                alt="이력서 이미지"
                                className="h-full w-full rounded-[5px] object-cover"
                            />
                        )}
                    </div>
                </label>
            </div>
            <input
                type="file"
                id="profileImage"
                accept="image/jpeg, image/png"
                className="hidden"
                onChange={handleImageUpload}
            />
        </div>
    );
};

export default ImageUploadInput;
