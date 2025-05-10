interface PersonalityTypeCardProps {
    description: string;
}
const PersonalityTypeCard = ({ description }: PersonalityTypeCardProps) => (
    <div className="flex gap-4 rounded-md border border-[#EEEEEE] bg-[#F8F8F8] px-6 py-4 text-xl">
        ✅
        <div className="flex flex-col">
            {/* <p className="mb-2 text-lg text-gray-600">타입 소개</p> */}
            <ul className="flex flex-col gap-1">
                {description.split("\n").map((desc, idx) => (
                    <li key={idx} className="text-base text-gray-600/80">
                        {desc}
                    </li>
                ))}
            </ul>
        </div>
    </div>
);
export default PersonalityTypeCard;
