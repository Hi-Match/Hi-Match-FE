import axiosInstance from "@/apis/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ImageIcon from "@/assets/icons/image-icon.svg?react";

interface ImageUploadInputProps {
    id: string;
    label?: string;
    image: string;
    setImage: (file: string) => void;
}

const ImageUploadInput = ({
    id,
    label,
    image,
    setImage,
}: ImageUploadInputProps) => {
    const { mutate } = useMutation({
        mutationFn: async (file: File) => {
            const formData = new FormData();
            formData.append("file", file);

            const response = await axiosInstance.post(
                "/himatch/resume/file",
                formData
            );

            return response.data;
        },
        onSuccess: data => {
            setImage(data.file);
        },
        onError: () => {
            toast.error("이미지 업로드에 실패했습니다. 다시 업로드 해 주세요.");
        },
    });

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (!file) return;

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
            mutate(file);
        }
    };

    const handleImageDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        setImage("");
    };

    return (
        <div className="image_upload_wrapper">
            {label ? (
                <p className="text-gray01 mb-2.5 text-sm font-medium">
                    {label}
                    <span className="text-red-500"> &#42;</span>
                </p>
            ) : (
                <div className="mt-7.5"></div>
            )}
            <label htmlFor={`image-${id}`} className="cursor-pointer">
                <div className="grid-center h-37.5 overflow-hidden rounded-[5px] border-1 border-solid border-gray-200">
                    {image === "" ? (
                        <div className="grid-center space-y-5 p-2.5">
                            <ImageIcon className="h-12.5 w-12.5 fill-gray-300" />
                            <p className="text-gray01 text-center text-sm break-keep">
                                이미지 업로드
                            </p>
                        </div>
                    ) : (
                        <img
                            src={image}
                            alt="이력서 이미지"
                            className="h-full w-full object-cover"
                        />
                    )}
                </div>
                {image && (
                    <button
                        type="button"
                        className="mt-[15px] h-11 w-full cursor-pointer bg-gray-200 font-medium text-black hover:bg-gray-300"
                        onClick={handleImageDelete}
                    >
                        삭제
                    </button>
                )}
            </label>
            <input
                type="file"
                id={`image-${id}`}
                accept="image/jpeg, image/png"
                className="hidden"
                onChange={handleImageUpload}
            />
        </div>
    );
};

export default ImageUploadInput;
