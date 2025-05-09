const PersonalityTypeCard = () => {
    const personalityType = [
        {
            description: "유쾌한 감각과 유연한 리더십으로 팀을 이끄는 나침반",
        },
        {
            description: "HR, 인력 개발, 갈등 해결 등 사람 중심의 업무에서 강점을 발휘합니다",
        },
    ];

    return (
        <div className="flex gap-4 rounded-md border border-[#EEEEEE] bg-[#F8F8F8] px-6 py-4 text-xl">
            ✅
            <div className="flex flex-col">
                <p className="mb-2 text-lg text-gray-600">타입 소개</p>
                <ul className="flex flex-col gap-1">
                    {personalityType.map(type => (
                        <li className="text-base text-gray-600/80">
                            - {type.description}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PersonalityTypeCard;
