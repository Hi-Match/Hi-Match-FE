import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    LabelList,
} from "recharts";

const PersonalityReportRate = ({
    rate,
}: {
    rate: {
        n: number;
        f: number;
        d: number;
        b: number;
        c: number;
        l: number;
        s: number;
        o: number;
    };
}) => {
    const data = [
        {
            axis: "Network (N) ↔ Focus (F)",
            value: rate.n,
            left: "소통하는\n(Network)",
            right: "집중하는\n(Focus)",
            leftValue: rate.n,
            rightValue: rate.f,
        },
        {
            axis: "Drive (D) ↔ Balance (B)",
            value: rate.d,
            left: "주도적인\n(Drive)",
            right: "안정적인\n(Balance)",
            leftValue: rate.d,
            rightValue: rate.b,
        },
        {
            axis: "Creative (C) ↔ Logical (L)",
            value: rate.c,
            left: "창의적인\n(Creative)",
            right: "분석적인\n(Logical)",
            leftValue: rate.c,
            rightValue: rate.l,
        },
        {
            axis: "Structured (S) ↔ Open (O)",
            value: rate.s,
            left: "수직적인\n(Structured)",
            right: "수평적인\n(Open)",
            leftValue: rate.s,
            rightValue: rate.o,
        },
    ];

    return (
        <div className="flex w-full flex-col gap-6 py-4">
            <ResponsiveContainer width="100%" height={300}>
                <BarChart
                    data={data}
                    layout="vertical"
                    margin={{ left: 10, right: 10, top: 0, bottom: 0 }}
                >
                    <XAxis type="number" domain={[0, 100]} hide />
                    <YAxis
                        type="category"
                        dataKey="axis"
                        tick={({ x, y, payload }) => {
                            const { left, right, leftValue, rightValue } =
                                data.find(d => d.axis === payload.value) || {};

                            // 줄바꿈(\n) 기준으로 분리
                            const leftLines = left.split("\n");
                            const rightLines = right.split("\n");

                            return (
                                <g transform={`translate(${x},${y})`}>
                                    {/* 왼쪽 라벨 */}
                                    <text
                                        x={-5}
                                        y={-8}
                                        textAnchor="end"
                                        fill="#888"
                                        fontSize="13"
                                    >
                                        {leftLines.map((line, idx) => (
                                            <tspan
                                                x={-5}
                                                dy={idx === 0 ? 0 : 15}
                                                key={idx}
                                            >
                                                {line}
                                            </tspan>
                                        ))}
                                        <tspan
                                            x={-5}
                                            dy={15}
                                        >{`(${leftValue}%)`}</tspan>
                                    </text>
                                    {/* 오른쪽 라벨 */}
                                    <text
                                        x={110}
                                        y={-8}
                                        textAnchor="start"
                                        fill="#888"
                                        fontSize="13"
                                    >
                                        {rightLines.map((line, idx) => (
                                            <tspan
                                                x={110}
                                                dy={idx === 0 ? 0 : 15}
                                                key={idx}
                                            >
                                                {line}
                                            </tspan>
                                        ))}
                                        <tspan
                                            x={110}
                                            dy={15}
                                        >{`(${rightValue}%)`}</tspan>
                                    </text>
                                </g>
                            );
                        }}
                        width={120}
                    />
                    <Tooltip />
                    <Bar dataKey="value" fill="#6b9ff4" radius={[0,8,8,0]}>
                        <LabelList dataKey="value" position="right" />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PersonalityReportRate;
