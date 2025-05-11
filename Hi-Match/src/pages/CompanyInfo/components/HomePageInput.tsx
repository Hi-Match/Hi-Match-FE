import Input from "@/components/Input/Input";

interface HomePageInputProps {
    value: string;
    setHomePage: (val: string) => void;
}

const HomePageInput = ({ value, setHomePage }: HomePageInputProps) => {
    const handleChangeUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        setHomePage(value);
    };

    return (
        <div className="homepage_input">
            <p className="text-gray01 mb-2.5 text-sm font-medium">
                홈페이지 주소
            </p>
            <Input
                id="company_url"
                type="text"
                value={value}
                variant="large"
                placeholder="http://"
                onChange={handleChangeUrl}
            />
        </div>
    );
};

export default HomePageInput;
