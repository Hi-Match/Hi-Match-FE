import PersonalityReportBox from "./components/PersonalityReportBox";

const PersonalityTest = () => {
    return (
        <div className="mx-auto flex w-full max-w-[1020px] flex-col gap-8">
            <h2 className="text-3xl font-semibold text-black">
                인성 검사 리포트 📂
            </h2>
            <PersonalityReportBox />
        </div>
    );
};

export default PersonalityTest;
