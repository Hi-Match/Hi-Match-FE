import ResumeForm from "../components/ResumeDetail/ResumeForm";

const ResumeDetail = () => {
    return (
        <div className="flex justify-center">
            <div className="w-210">
                <h3 className="mb-2.5 text-lg font-medium text-black">
                    이력서
                </h3>
                <ResumeForm />
            </div>
        </div>
    );
};

export default ResumeDetail;
