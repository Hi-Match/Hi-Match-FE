import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface MemberOutSuccessModalProps {
    isOpen: boolean;
}

const MemberOutSuccessModal = ({ isOpen }: MemberOutSuccessModalProps) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    const navigate = useNavigate();

    const handleClickCheck = () => {
        navigate("/");
    };

    if (!isOpen) return null;

    return (
        <div className="modal_wrapper grid-center fixed top-0 left-0 z-999 h-screen w-screen bg-[rgba(0,0,0,0.2)]">
            <div className="modal w-102 space-y-12.5 rounded-[10px] bg-white p-7.5">
                <div className="content_wrapper">
                    <h3 className="mb-7.5 text-center text-lg font-semibold text-black">
                        탈퇴 완료
                    </h3>
                    <div className="content grid-center">
                        <p className="text-base">
                            회원탈퇴가 정상적으로 처리되었습니다.
                        </p>
                        <p className="text-base">
                            그동안 Hi Match를 이용해 주셔서 감사합니다.
                        </p>
                    </div>
                </div>
                <div className="btn_wrapper flex w-full justify-end">
                    <button
                        type="button"
                        className="btn-white px-3 py-2 text-base"
                        onClick={handleClickCheck}
                    >
                        확인
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MemberOutSuccessModal;
