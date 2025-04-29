interface LoginIdInputProps {
    id: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const LoginIdInput = ({ id, onChange }: LoginIdInputProps) => {
    return (
        <div className="id_input_wrapper relative">
            <input
                className="id_input input input-sm peer appearance-none pt-4 text-base text-black"
                id="id"
                name="id"
                type="text"
                value={id}
                maxLength={20}
                placeholder=""
                onChange={onChange}
                required
                autoFocus
            />
            <label
                htmlFor="id"
                className="text-gray02 id_label absolute start-[15px] top-3.5 z-10 origin-[0] -translate-y-3 scale-75 transform text-base duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-3 peer-focus:scale-75 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
            >
                아이디
            </label>
        </div>
    );
};

export default LoginIdInput;
