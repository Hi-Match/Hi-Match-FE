interface ApplicationTableRowProps {
    item: ApplicationItem;
}
const ApplicationTableRow = ({ item }: ApplicationTableRowProps) => (
    <tr>
        <td>{item.applicationName}</td>
        <td>{item.applicationPart}</td>
        <td>{item.applicationContract}</td>
        <td>{item.applicationDate}</td>
        <td>{item.applicationStatus}</td>
    </tr>
);
export default ApplicationTableRow;
