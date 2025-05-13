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
    const personalityTypes = {
        N: { text: "소통하는\n(Network)", value: rate.n },
        F: { text: "집중하는\n(Focus)", value: rate.f },
        D: { text: "주도적인\n(Drive)", value: rate.d },
        B: { text: "안정적인\n(Balance)", value: rate.b },
        C: { text: "창의적인\n(Creative)", value: rate.c },
        L: { text: "분석적인\n(Logical)", value: rate.l },
        S: { text: "수직적인\n(Structured)", value: rate.s },
        O: { text: "수평적인\n(Open)", value: rate.o },
    };

    const data = [
        {
            axis: "Network (N) ↔ Focus (F)",
            ...compareTypes(personalityTypes.N, personalityTypes.F),
        },
        {
            axis: "Drive (D) ↔ Balance (B)",
            ...compareTypes(personalityTypes.D, personalityTypes.B),
        },
        {
            axis: "Creative (C) ↔ Logical (L)",
            ...compareTypes(personalityTypes.C, personalityTypes.L),
        },
        {
            axis: "Structured (S) ↔ Open (O)",
            ...compareTypes(personalityTypes.S, personalityTypes.O),
        },
    ];

    function compareTypes(
        a: (typeof personalityTypes)[keyof typeof personalityTypes],
        b: (typeof personalityTypes)[keyof typeof personalityTypes]
    ) {
        return {
            value: Math.max(a.value, b.value),
            text: a.value > b.value ? a.text : b.text,
        };
    }

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
                            const { text } =
                                data.find(d => d.axis === payload.value) || {};

                            // 줄바꿈(\n) 기준으로 분리
                            const lines = (text ?? "").split("\n");

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
                                        {lines.map((line, idx) => (
                                            <tspan
                                                x={-5}
                                                dy={idx === 0 ? 0 : 15}
                                                key={idx}
                                            >
                                                {line}
                                            </tspan>
                                        ))}
                                    </text>
                                </g>
                            );
                        }}
                        width={120}
                    />
                    <Tooltip />
                    <Bar dataKey="value" fill="#6b9ff4" radius={[0, 8, 8, 0]}>
                        <LabelList dataKey="value" position="right" />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PersonalityReportRate;
