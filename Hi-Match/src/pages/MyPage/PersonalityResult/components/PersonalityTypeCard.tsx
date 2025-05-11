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
                            className="text-xl font-semibold leading-relaxed text-black/90"
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
                        <strong className="font-semibold " {...props} />
                    ),
                    li: ({ ...props }) => (
                        <li
                            className="font-[400] text-base py-1 text-black/80"
                            {...props}
                        />
                    ),
                }}
            >
                {description}
            </ReactMarkdown>
        </div>
    </div>
);
export default PersonalityTypeCard;
