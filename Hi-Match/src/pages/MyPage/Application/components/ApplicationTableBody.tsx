import ApplicationTableRow from "./ApplicationTableRow";

interface ApplicationTableBodyProps {
    data: ApplicationItem[];
}
const ApplicationTableBody = ({ data }: ApplicationTableBodyProps) => (
    <tbody>
        {data.length === 0 ? (
            <tr>
                <td colSpan={5} className="py-8 text-center text-gray-400">
                    지원 내역이 없습니다.
                </td>
            </tr>
        ) : (
            data.map(item => (
                <ApplicationTableRow key={item.applicationNo} item={item} />
            ))
        )}
    </tbody>
);
export default ApplicationTableBody;
