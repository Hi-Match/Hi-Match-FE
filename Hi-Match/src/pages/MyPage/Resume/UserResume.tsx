import ResumeList from "./components/ResumeList/ResumeList";

const UserResume = () => {
    return (
        <div className="resume_wrapper">
            <div className="w-237">
                <div className="flex justify-between">
                    <h2 className="mb-12.5 text-2xl font-semibold text-black">
                        내 이력서 목록
                    </h2>
                </div>
                <ResumeList />
            </div>
        </div>
    );
};

export default UserResume;
