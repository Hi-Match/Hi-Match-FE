interface Option {
    value: string;
    label: string;
}

interface JobFilterSelectProps {
    icon: React.ReactNode;
    label: string;
    options: Option[];
    value: string;
    onChange: (value: string) => void;
}

const JobFilterSelect = ({
    icon,
    label,
    options,
    value,
    onChange,
}: JobFilterSelectProps) => (
    <div className="flex items-center gap-2 border-0 flex-1 border-r border-gray-200 p-2 last:border-r-0">
        {icon}
        <select
            value={value}
            onChange={e => onChange(e.target.value)}
            className="rounded border border-none px-2 py-1 w-full"
        >
            <option value="">{label}</option>
            {options.map(opt => (
                <option key={opt.value} value={opt.value}>
                    {opt.label}
                </option>
            ))}
        </select>
    </div>
);
export default JobFilterSelect;
