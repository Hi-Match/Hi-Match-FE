const ApplicationTableHeader = () => {
    const headerList = ["회사명", "직무", "계약 형태", "지원 일시"];

    return (
        <thead>
            <tr className="border-gray-300 text-center">
                {headerList.map(header => (
                    <th className="border-r border-b border-gray-300 bg-gray-100 py-3 font-semibold">
                        {header}
                    </th>
                ))}
                <th className=" border-b border-gray-300 bg-gray-100 py-3 font-semibold">
                    지원 상태
                </th>
            </tr>
        </thead>
    );
};
export default ApplicationTableHeader;
