
import { usePersonalityResult } from "../../../hooks/test/usePersonalityResult";


const PersonalityResult = () => {
    const { result, isLoading, error } = usePersonalityResult();

    if (isLoading) {
        return (
            <div className="flex h-[calc(100vh-200px)] items-center justify-center">
                <div className="text-center">
                    <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
                    <p className="text-gray-600">결과를 불러오는 중입니다...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="mx-auto flex w-full flex-col gap-6 px-15">
                <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
                    <p className="text-red-600">{error}</p>
                    <button
                        type="button"
                        onClick={() => window.location.reload()}
                        className="mt-4 rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                    >
                        다시 시도
                    </button>
                </div>
            </div>
        );
    }

    if (!result) {
        return (
            <div className="mx-auto flex w-full flex-col gap-6 px-15">
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center">
                    <p className="text-gray-600">아직 검사 결과가 없습니다.</p>
                </div>
            </div>
        );
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
                        {result.code}
                    </p>
                </div>
                <div className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-900">
                        슬로건
                    </h3>
                    <p className="mt-2 text-lg text-gray-700">
                        {result.slogan}
                    </p>
                </div>
                <div className="prose max-w-none">
                    <h3 className="text-xl font-semibold text-gray-900">
                        상세 설명
                    </h3>
                    <div className="mt-4 whitespace-pre-wrap text-gray-700">
                        {result.description}
                    </div>
                    <div className="mt-6 whitespace-pre-wrap text-gray-700">
                        {result.detail}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonalityResult;
