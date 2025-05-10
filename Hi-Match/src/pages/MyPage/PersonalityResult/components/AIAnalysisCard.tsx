interface AIAnalysisCardProps {
    detail: { title: string; detailContent: string[] }[];
}
const AIAnalysisCard = ({ detail }: AIAnalysisCardProps) => (
    <div className="gradient-card-bg rounded-md p-[1px]">
        <div className="flex flex-col rounded-sm bg-white/95 px-6 py-4 text-xl backdrop-blur-2xl">
            <p className="mb-4 text-sm text-gray-600">
                하이매치의 시크릿 팁 ✨
            </p>
            {detail.map((item, idx) => (
                <div key={idx} className="mb-3">
                    <div className="text-lg text-black/90">{item.title}</div>
                    <ul className="ml-4 list-disc text-black/80 text-base">
                        {item.detailContent.map((d, i) => (
                            <li key={i}>{d}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    </div>
);
export default AIAnalysisCard;
