const TestTableRow = ({
    type,
    id,
    question,
    checkedValue,
    onChange,
}: PersonalityTestQuestion) => {
    return (
        <tr>
            <td className="border-b border-gray-200 px-4 py-2 text-center">
                {id}
            </td>
            <td className="border-b border-l border-gray-200 px-4 py-2">
                {question}
            </td>
            {type === "A"
                ? ["예", "아니오"].map(label => (
                      <td
                          key={label}
                          className="cursor-pointer border-b border-l border-gray-200"
                      >
                          <input
                              type="radio"
                              value={label}
                              checked={checkedValue === label}
                              onChange={() => onChange?.(label)}
                              className="h-full w-full cursor-pointer align-middle"
                          />
                      </td>
                  ))
                : [
                      "매우 싫어함",
                      "싫어함",
                      "약간 싫어함",
                      "약간 좋아함",
                      "좋아함",
                      "매우 좋아함",
                  ].map(label => (
                      <td
                          key={label}
                          className="cursor-pointer border-b border-l border-gray-200"
                      >
                          <input
                              type="radio"
                              value={label}
                              checked={checkedValue === label}
                              onChange={() => onChange?.(label)}
                              className="h-full w-full cursor-pointer align-middle"
                          />
                      </td>
                  ))}
        </tr>
    );
};

export default TestTableRow;
