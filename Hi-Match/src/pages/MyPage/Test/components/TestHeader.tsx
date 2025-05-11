import { HEADER_TYPE } from "@/constants/test-type";

interface TestHeaderProps {
    type: "A" | "B";
}

const TestHeader = ({ type }: TestHeaderProps) => {
    const header = HEADER_TYPE[type] || [];
    return (
        <thead>
            <tr>
                {header.map(h => (
                    <th
                        className={`w-${h.width} ${h.border ?? ""} border-b border-gray-200 bg-gray-50 py-3 font-semibold`}
                        key={h.text}
                    >
                        {h.text}
                    </th>
                ))}
            </tr>
        </thead>
    );
};

export default TestHeader;
