interface PersonalityReportTitleProps {
    code: string;
    slogan: string;
}

const PersonalityReportTitle = ({
    code,
    slogan,
}: PersonalityReportTitleProps) => (
    <div className="mb-10 flex w-full flex-col gap-2 text-center">
        <p className="mb-6 text-[#999999]">
            하이매치가 분석한 당신의 성향은 ✨
        </p>
        <h2 className="text-4xl font-semibold text-[#333333]">{code}</h2>
        <span className="text-[#666666]">{slogan}</span>
    </div>
);

export default PersonalityReportTitle;
