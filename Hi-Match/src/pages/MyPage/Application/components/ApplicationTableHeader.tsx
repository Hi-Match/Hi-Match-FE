const ApplicationTableHeader = () => (
    <thead>
        <tr className=" border-gray-300 text-center">
            <th className="border-r border-b border-gray-300 py-2 font-normal">
                회사명
            </th>
            <th className="border-r border-b border-gray-300 py-2 font-normal">
                직무
            </th>
            <th className="border-r border-b border-gray-300 py-2 font-normal">
                계약 형태
            </th>
            <th className="border-r border-b border-gray-300 py-2 font-normal">
                지원 시간
            </th>
            <th className="border-b border-gray-300 py-2 font-normal">
                지원 상태
            </th>
        </tr>
    </thead>
);
export default ApplicationTableHeader;
