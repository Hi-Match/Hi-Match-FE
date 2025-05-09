import PersonalityReportTitle from "./PersonalityReportTitle";
import PersonalityTypeCard from "./PersonalityTypeCard";
import AIAnalysisCard from "./AIAnalysisCard";
const PersonalityReportBox = () => {
    return (
        <div className="rounded-lg border border-[#EEEEEE] bg-[#FDFDFD] p-15">
            <PersonalityReportTitle />
            <PersonalityTypeCard />
            <AIAnalysisCard />
        </div>
    );
};

export default PersonalityReportBox;
