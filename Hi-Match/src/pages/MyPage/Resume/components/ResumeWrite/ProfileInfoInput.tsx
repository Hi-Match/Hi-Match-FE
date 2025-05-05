import DatePicker from "@/components/Input/DatePicker";
import { useState } from "react";

const ProfileInfoInput = () => {
    const [name, setName] = useState<string>("");
    const [engName, setEngName] = useState<string>("");
    const [birth, setBirth] = useState<string>("");

    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        setName(value);
    };

    const handleChangeEngName = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = event.target.value;

        setEngName(value);
    };

    return (
        <>
            <div className="user_name space-y-2.5">
                <input
                    id="name"
                    type="text"
                    value={name}
                    placeholder="이름"
                    className="w-full text-[28px] font-semibold text-black focus:outline-none"
                    onChange={handleChangeName}
                />
                <input
                    id="engName"
                    type="text"
                    value={engName}
                    placeholder="영어 이름 (ex. Gildong Hong)"
                    className="w-full text-base font-medium text-black focus:outline-none"
                    onChange={handleChangeEngName}
                />
            </div>
            <div className="user_info space-y-2.5">
                <DatePicker
                    label="생년월일"
                    onChange={date => setBirth(date)}
                />
            </div>
        </>
    );
};

export default ProfileInfoInput;
