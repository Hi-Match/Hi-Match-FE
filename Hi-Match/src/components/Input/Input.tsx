import React from "react";

type InputSize = "small" | "medium" | "large";

type ButtonHandler = {
    buttonEnabled: boolean;
    buttonText: string;
    onClick: () => void;
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    id: string;
    value?: string;
    variant?: InputSize;
    isValid?: boolean;
    validMessage?: string;
    buttonHandler?: ButtonHandler;
}

const Input = ({
    label,
    id,
    value,
    variant = "small",
    isValid,
    validMessage,
    buttonHandler,
    ...props
}: InputProps) => {
    const inputSize = {
        small: "input-sm",
        medium: "input-md",
        large: "input-lg",
    };

    return (
        <div className="input_wrapper flex w-full flex-col">
            {label && (
                <label
                    htmlFor={id}
                    className="mb-2.5 w-full font-semibold text-black"
                >
                    {label}
                </label>
            )}
            <div className="relative">
                <input
                    className={`input ${!isValid && validMessage ? "input-fail" : ""} ${inputSize[variant]} ${props.disabled ? "text-gray01 bg-gray-50" : ""}`}
                    id={id}
                    value={value}
                    {...props}
                />
                {buttonHandler && (
                    <button
                        type="button"
                        className={`absolute top-[13px] right-[15px] bg-transparent text-base font-semibold ${buttonHandler.buttonEnabled && isValid ? "cursor-pointer text-blue-500" : "text-gray02"}`}
                        onClick={buttonHandler.onClick}
                        disabled={!buttonHandler.buttonEnabled}
                    >
                        {buttonHandler.buttonText}
                    </button>
                )}
            </div>
            {validMessage && (
                <div className="mt-1.25 w-full">
                    <span
                        className={`text-sm break-keep ${isValid ? "text-green-500" : "text-red-400"}`}
                    >
                        {validMessage}
                    </span>
                </div>
            )}
        </div>
    );
};

export default Input;
