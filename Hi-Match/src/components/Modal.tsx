import { useEffect } from "react";

interface ModalProps {
    isOpen: boolean;
    title: string;
    buttonEnabled?: boolean;
    buttonText: string;
    onClose: () => void;
    onSubmit: () => void;
    children: React.ReactNode;
}

const Modal = ({
    isOpen,
    title,
    buttonEnabled = true,
    buttonText,
    onClose,
    onSubmit,
    children,
}: ModalProps) => {
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

    if (!isOpen) return null;

    return (
        <div
            className="modal_wrapper grid-center fixed top-0 left-0 z-999 h-screen w-screen bg-[rgba(0,0,0,0.2)]"
            onClick={onClose}
        >
            <div
                className="modal w-102 space-y-12.5 rounded-[10px] bg-white p-7.5"
                onClick={event => event.stopPropagation()}
            >
                <div className="content_wrapper">
                    <h3 className="mb-7.5 text-center text-lg font-semibold text-black">
                        {title}
                    </h3>
                    {children}
                </div>
                <div className="btn_wrapper space-x-2.5 [&>button]:h-10 [&>button]:min-h-10 [&>button]:w-[169px] [&>button]:px-5">
                    <button
                        type="button"
                        className="btn-white"
                        onClick={onClose}
                    >
                        취소
                    </button>
                    <button
                        type="submit"
                        className={` ${buttonEnabled ? "btn-blue" : "btn-disabled"}`}
                        onClick={onSubmit}
                        disabled={buttonEnabled ? false : true}
                    >
                        {buttonText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
