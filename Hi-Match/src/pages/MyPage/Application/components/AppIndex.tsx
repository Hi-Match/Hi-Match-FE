const AppIndex = ({
    indexList,
    selectedIndex,
    onChange,
    counts,
}: AppIndexProps) => (
    <ul className="flex justify-center">
        {indexList.map(idx => (
            <li
                key={idx.key}
                className={`cursor-pointer border-r border-gray-300 last:border-r-0 font ${
                    selectedIndex === idx.key ? "font-semibold text-blue-500" : ""
                }`}
                onClick={() => onChange(idx.key)}
            >
                <button className="flex w-full flex-col items-center gap-1 px-8 py-2 cursor-pointer">
                    <p className="text-lg">{idx.label}</p>
                    <p className="text-2xl">{counts[idx.key]}</p>
                </button>
            </li>
        ))}
    </ul>
);
export default AppIndex;
