import ApplicationTableBody from "./ApplicationTableBody";
import ApplicationTableHeader from "./ApplicationTableHeader";

interface ApplicationTableProps {
    data: ApplicationItem[];
    loading: boolean;
}
const ApplicationTable = ({ data, loading }: ApplicationTableProps) => {
    return (
        <table className="w-full border-separate border-spacing-0 overflow-hidden rounded-md border border-gray-300">
            <ApplicationTableHeader />
            <ApplicationTableBody data={data} loading={loading} />
        </table>
    );
};
export default ApplicationTable;
