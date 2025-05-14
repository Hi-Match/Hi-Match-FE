
const AIAnalysisCard = ({ detail }: AIAnalysisCardProps) => (
    <div className="gradient-card-bg rounded-md p-[1px]">
        <div className="flex flex-col rounded-sm bg-white/95 px-6 py-4 text-xl backdrop-blur-2xl">
            <p className="mb-4 text-sm text-gray-600">
                하이매치가 해석한 인재상 ✨
            </p>
            {detail.map((item, idx) => (
                <div key={idx} className="mb-3">
                    <div className="text-lg text-black/90 mb-1">
                        <span className="mr-2">✅</span>
                        {item.title}
                    </div>
                    <ul className="ml-4 list-disc text-base pl-2 text-black/80">
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
