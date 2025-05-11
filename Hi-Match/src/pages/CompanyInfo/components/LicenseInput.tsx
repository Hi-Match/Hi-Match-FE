import Input from "@/components/Input/Input";

interface LicenseInputProps {
    value: string;
}

const LicenseInput = ({ value }: LicenseInputProps) => {
    return (
        <div className="license_input">
            <p className="text-gray01 mb-2.5 text-sm font-medium">
                사업자등록번호
                <span className="text-red-500"> &#42;</span>
            </p>
            <Input id="license" type="text" value={value} disabled />
        </div>
    );
};

export default LicenseInput;
