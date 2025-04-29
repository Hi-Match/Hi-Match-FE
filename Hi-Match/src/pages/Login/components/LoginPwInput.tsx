import { useState } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

interface LoginPwInputProps {
    password: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const LoginPwInput = ({ password, onChange }: LoginPwInputProps) => {
    const [isViewPassword, setIsViewPassword] = useState<boolean>(false);

    const handleTogglePassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
        setIsViewPassword(!isViewPassword);
    };

    return (
        <div className="pw_input_wrapper relative">
            <input
                className="input input-sm peer appearance-none pt-4 text-base text-black"
                id="pw"
                name="pw"
                type={`${isViewPassword ? "text" : "password"}`}
                value={password}
                maxLength={16}
                placeholder=""
                onChange={onChange}
                required
            />
            <label
                htmlFor="pw"
                className="text-gray02 absolute start-[15px] top-3.5 z-10 origin-[0] -translate-y-3 scale-75 transform text-base duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-3 peer-focus:scale-75 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
            >
                비밀번호
            </label>
            {password && (
                <button
                    type="button"
                    className="absolute top-[13px] right-[15px] cursor-pointer"
                    onClick={handleTogglePassword}
                >
                    {isViewPassword ? (
                        <IoEyeOutline className="text-gray01 h-6 w-6" />
                    ) : (
                        <IoEyeOffOutline className="text-gray01 h-6 w-6" />
                    )}
                </button>
            )}
        </div>
    );
};

export default LoginPwInput;
