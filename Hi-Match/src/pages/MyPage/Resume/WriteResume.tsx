import { useState } from "react";
import ResumeInputForm from "./components/ResumeWrite/ResumeInputForm";

const WriteResume = () => {
    const [resumeTitle, setResumeTitle] = useState<string>("");

    const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        setResumeTitle(value);
    };

    return (
        <div className="flex justify-center">
            <div className="w-210">
                <h2 className="mb-2.5 text-lg font-medium text-black">
                    이력서 작성
                </h2>
                <div className="title_wrapper mb-7.5">
                    <input
                        id="title"
                        type="text"
                        className="w-full text-2xl font-semibold text-black focus:outline-none"
                        value={resumeTitle}
                        placeholder="제목을 작성해 주세요."
                        maxLength={30}
                        onChange={handleChangeTitle}
                    />
                </div>
                <ResumeInputForm />
            </div>
        </div>
    );
};

export default WriteResume;
