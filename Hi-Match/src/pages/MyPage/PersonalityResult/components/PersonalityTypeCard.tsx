import ReactMarkdown from "react-markdown";
interface PersonalityTypeCardProps {
    description: string;
}
const PersonalityTypeCard = ({ description }: PersonalityTypeCardProps) => (
    <div className="flex gap-4 rounded-md border border-[#EEEEEE] bg-[#F8F8F8] px-6 py-4 text-xl">
        ✅
        <div className="markdown-custom flex flex-col">
            <ReactMarkdown
                components={{
                    h2: ({ ...props }) => (
                        <h2
                            className="text-xl leading-relaxed font-semibold text-black w-full border-b border-black/10 pb-2"
                            {...props}
                        />
                    ),
                    ol: ({ ...props }) => (
                        <ol
                            className="list-disc py-1 text-base text-black/80"
                            {...props}
                        />
                    ),
                    strong: ({ ...props }) => (
                        <strong
                            className="pr-1 text-lg leading-relaxed font-normal text-black/90"
                            {...props}
                        />
                    ),
                    li: ({ ...props }) => (
                        <li
                            className="py-1 text-base font-[400] text-black/80"
                            {...props}
                        />
                    ),
                    p: ({ ...props }) => (
                        <p className="text-base text-black/80 pt-2" {...props} />
                    ),
                }}
            >
                {description}
            </ReactMarkdown>
        </div>
    </div>
);

export default PersonalityTypeCard;
