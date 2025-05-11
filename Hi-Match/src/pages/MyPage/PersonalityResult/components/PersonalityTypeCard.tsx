import ReactMarkdown from "react-markdown";
interface PersonalityTypeCardProps {
    description: string;
}
const PersonalityTypeCard = ({ description }: PersonalityTypeCardProps) => (
    <div className="flex gap-4 rounded-md border border-[#EEEEEE] bg-[#F8F8F8] px-6 py-4 text-xl">
        ✅
        <div className="flex flex-col">
            <ReactMarkdown>{description}</ReactMarkdown>
        </div>
    </div>
);
export default PersonalityTypeCard;
