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
    <div className="flex items-center gap-2">
        {icon}
        <select
            value={value}
            onChange={e => onChange(e.target.value)}
            className="rounded border px-2 py-1"
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
