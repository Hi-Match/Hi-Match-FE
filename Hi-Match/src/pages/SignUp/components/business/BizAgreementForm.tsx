import { FaCheck } from "react-icons/fa6";

interface BizAgreementFormProps {
    checkList: BizAgreementState;
    setCheckList: React.Dispatch<React.SetStateAction<BizAgreementState>>;
}

type SingleCheckKey = Exclude<keyof BizAgreementFormProps["checkList"], "all">;

const BizAgreementForm = ({
    checkList,
    setCheckList,
}: BizAgreementFormProps) => {
    // 약관 전체 동의 함수
    const handleCheckAll = () => {
        const value = !checkList.all;

        setCheckList({
            all: value,
            use: value,
            business: value,
        });
    };

    // 약관 동의 함수
    const handleCheckSingle = (check: SingleCheckKey) => {
        const updated = { ...checkList, [check]: !checkList[check] };

        const { use, business } = updated;
        updated.all = use && business;

        setCheckList(updated);
    };

    return (
        <div className="checkList_wrapper">
            <div className="relative flex w-full items-center justify-start">
                <input
                    type="checkbox"
                    id="all"
                    className="peer hidden"
                    checked={checkList.all}
                    onChange={handleCheckAll}
                />
                <label
                    htmlFor="all"
                    className="cursor-pointer pl-[26px] text-base font-semibold text-black before:absolute before:top-1 before:left-0 before:h-4 before:w-4 before:rounded-sm before:border before:border-gray-300 before:bg-white peer-checked:before:bg-blue-500"
                >
                    전체 동의
                </label>
                <FaCheck className="pointer-events-none absolute top-1.5 left-0.5 hidden h-3 w-3 fill-white peer-checked:block" />
            </div>
            <span className="my-3.75 block w-full border-b-1 border-gray-200"></span>
            <div className="space-y-3.75">
                <div className="relative flex w-full items-center justify-start">
                    <input
                        type="checkbox"
                        id="use"
                        className="peer hidden"
                        checked={checkList.use}
                        onChange={() => handleCheckSingle("use")}
                    />
                    <label
                        htmlFor="use"
                        className="text-gray01 cursor-pointer pl-[26px] text-base font-medium before:absolute before:top-1 before:left-0 before:h-4 before:w-4 before:rounded-sm before:border before:border-gray-300 before:bg-white peer-checked:before:bg-blue-500"
                    >
                        [필수] 하이매치 이용약관 동의
                    </label>
                    <FaCheck className="pointer-events-none absolute top-1.5 left-0.5 hidden h-3 w-3 fill-white peer-checked:block" />
                </div>
                <div className="relative flex w-full items-center justify-start">
                    <input
                        type="checkbox"
                        id="personal"
                        className="peer hidden"
                        checked={checkList.business}
                        onChange={() => handleCheckSingle("business")}
                    />
                    <label
                        htmlFor="personal"
                        className="text-gray01 cursor-pointer pl-[26px] text-base font-medium before:absolute before:top-1 before:left-0 before:h-4 before:w-4 before:rounded-sm before:border before:border-gray-300 before:bg-white peer-checked:before:bg-blue-500"
                    >
                        [필수] 개인정보 수집 및 이용 동의
                    </label>
                    <FaCheck className="pointer-events-none absolute top-1.5 left-0.5 hidden h-3 w-3 fill-white peer-checked:block" />
                </div>
            </div>
        </div>
    );
};

export default BizAgreementForm;
