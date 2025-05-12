import ArrowRightIcon from "@/assets/icons/angle-right-icon.svg?react";

interface TestResult {
    slogan: string;
    lastDateTime: string;
}

interface PersonalityTestProps {
    code: TestResult[];
}

const PersonalityTest = ({ code }: PersonalityTestProps) => {
    return (
        <div className="personality_test">
            <div className="resume_title flex items-center justify-between">
                <h3 className="text-lg font-semibold text-black">인성 검사</h3>
                <span
                    className="flex cursor-pointer items-center"
                    // onClick={handleClickResume}
                >
                    <span className="text-gray01">전체보기</span>
                    <ArrowRightIcon className="fill-gray02 h-4 w-4" />
                </span>
            </div>
            <ul>
                <li></li>
            </ul>
        </div>
    );
};

export default PersonalityTest;
