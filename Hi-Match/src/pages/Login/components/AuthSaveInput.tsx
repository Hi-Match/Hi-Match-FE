import { useEffect } from "react";
import { FaCheck } from "react-icons/fa6";

interface AuthSaveInputProps {
    user: "user" | "business";
    setId: (val: string) => void;
    setIsId: (val: boolean) => void;
    isChecked: boolean;
    setIsChecked: (val: boolean) => void;
}

const AuthSaveInput = ({
    user,
    setId,
    setIsId,
    isChecked,
    setIsChecked,
}: AuthSaveInputProps) => {
    useEffect(() => {
        const saved = localStorage.getItem(getStorageKey(user));

        if (saved) {
            setId(saved);
            setIsId(0 < saved.length);
            setIsChecked(true);
        }
    }, [setId, setIsChecked, setIsId, user]);

    const getStorageKey = (user: "user" | "business") => {
        return user === "user" ? "saveUserId" : "saveBizId";
    };

    const handleSaveId = () => {
        setIsChecked(!isChecked);
    };

    return (
        <div className="relative mt-[15px]">
            <input
                type="checkbox"
                id="idSave"
                className="peer hidden"
                checked={isChecked}
                onChange={handleSaveId}
            />
            <label
                htmlFor="idSave"
                className="cursor-pointer pl-[26px] text-sm before:absolute before:top-0.5 before:left-0 before:h-5 before:w-5 before:rounded-sm before:border before:border-gray-300 before:bg-white peer-checked:before:bg-blue-500"
            >
                아이디 저장
            </label>
            <FaCheck className="pointer-events-none absolute top-1 left-0.5 hidden h-4 w-4 fill-white peer-checked:block" />
        </div>
    );
};

export default AuthSaveInput;
