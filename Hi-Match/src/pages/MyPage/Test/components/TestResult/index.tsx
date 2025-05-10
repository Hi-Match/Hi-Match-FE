import { useLocation, Navigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";

interface TestResultProps {
    code: string;
    description: string;
}

const TestResult = () => {
    const location = useLocation();
    const testResult = location.state?.testResult as TestResultProps;

    // 결과 데이터가 없으면 테스트 페이지로 리다이렉트
    if (!testResult) {
        return <Navigate to="/mypage/test" replace />;
    }

    return (
        <div className="mx-auto flex w-full flex-col gap-6 px-15">
            <h2 className="text-3xl font-semibold text-black">
                인성 검사 결과 🎯
            </h2>
            <div className="rounded-lg border border-gray-200 bg-white p-6">
                <div className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-900">
                        인재상 코드
                    </h3>
                    <p className="mt-2 text-2xl font-bold text-blue-600">
                        {testResult.code}
                    </p>
                </div>
                <div className="prose max-w-none">
                    <ReactMarkdown>{testResult.description}</ReactMarkdown>
                </div>
            </div>
        </div>
    );
};

export default TestResult;
