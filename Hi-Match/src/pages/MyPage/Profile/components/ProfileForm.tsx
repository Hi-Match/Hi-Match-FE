import { useUserStore } from "@/store/userStore";
import { useState } from "react";
import EmailEditModal from "./EmailEditModal";
import PhoneEditModal from "./PhoneEditModal";
import PasswordEditModal from "./PasswordEditModal";
import MemberOutModal from "./MemberOutModal";
import MemberOutSuccessModal from "./MemberOutSuccessModal";
import { formatPhoneNumber } from "@/utils/phoneFormat";

const ProfileForm = () => {
    const [modalOpen, setModalOpen] = useState({
        emailModal: false,
        passwordModal: false,
        phoneModal: false,
        memberOutModal: false,
        memberOutSuccessModal: false,
    });

    const { user } = useUserStore();

    const openModal = (key: keyof typeof modalOpen, value: boolean) => {
        setModalOpen(prev => ({ ...prev, [key]: value }));
    };

    const handleClickMemberOut = () => {
        openModal("memberOutModal", false);
        openModal("memberOutSuccessModal", true);
    };

    return (
        <div className="profile_form_wrapper space-y-7.5">
            <div className="w-full rounded-[10px] border-1 border-solid border-gray-50 bg-white p-7.5 shadow-sm">
                <h3 className="mb-2.5 text-lg font-semibold text-black">
                    가입 정보
                </h3>
                <span className="text-gray01 mb-5 inline-block text-sm">
                    하이매치에 가입되어 있는 정보를 확인할 수 있어요.
                </span>
                <ul className="text-base text-black [&>li]:flex [&>li]:h-15 [&>li]:items-center [&>li]:not-last:border-b-1 [&>li]:not-last:border-b-gray-200 [&>li>span:first-child]:min-w-30 [&>li>span:first-child]:font-semibold [&>li>span:last-child]:font-medium">
                    <li>
                        <span>이름</span>
                        <span>{user?.memberName}</span>
                    </li>
                    <li>
                        <span>아이디</span>
                        <span>{user?.memberID}</span>
                    </li>
                    <li>
                        <span>가입일자</span>
                        <span>{user?.memberJoinDate}</span>
                    </li>
                </ul>
            </div>
            <div className="w-full rounded-[10px] border-1 border-solid border-gray-50 bg-white p-7.5 shadow-sm">
                <h3 className="mb-2.5 text-lg font-semibold text-black">
                    계정
                </h3>
                <span className="text-gray01 mb-5 inline-block text-sm">
                    내 계정 정보를 수정할 수 있습니다.
                </span>
                <ul className="text-base text-black [&>li]:flex [&>li]:h-15 [&>li]:items-center [&>li]:not-last:border-b-1 [&>li]:not-last:border-b-gray-200 [&>li>button]:justify-end [&>li>span:first-child]:min-w-30 [&>li>span:first-child]:font-semibold [&>li>span:nth-child(2)]:flex-1">
                    <li>
                        <span>이메일</span>
                        <span>{user?.memberMail}</span>
                        <button
                            type="button"
                            className="btn-sm cursor-pointer border border-solid border-gray-400 text-gray-500 hover:bg-gray-100"
                            onClick={() => openModal("emailModal", true)}
                        >
                            수정
                        </button>
                    </li>
                    <li>
                        <span>비밀번호</span>
                        <span></span>
                        <button
                            type="button"
                            className="btn-sm cursor-pointer border border-solid border-gray-400 text-gray-500 hover:bg-gray-100"
                            onClick={() => openModal("passwordModal", true)}
                        >
                            수정
                        </button>
                    </li>
                    <li>
                        <span>휴대폰 번호</span>
                        <span>
                            {formatPhoneNumber(
                                JSON.parse(atob(user?.memberPhone ?? ""))
                            )}
                        </span>
                        <button
                            type="button"
                            className="btn-sm cursor-pointer border border-solid border-gray-400 text-gray-500 hover:bg-gray-100"
                            onClick={() => openModal("phoneModal", true)}
                        >
                            수정
                        </button>
                    </li>
                </ul>
            </div>
            <div className="member_delete_wrapper flex w-full justify-end">
                <span
                    className="member_delete text-gray01 cursor-pointer"
                    onClick={() => openModal("memberOutModal", true)}
                >
                    회원탈퇴
                </span>
            </div>
            {/* 정보 변경 모달 */}
            <>
                <EmailEditModal
                    isOpen={modalOpen.emailModal}
                    userEmail={user?.memberMail ?? ""}
                    onClose={() => openModal("emailModal", false)}
                />
                <PasswordEditModal
                    isOpen={modalOpen.passwordModal}
                    onClose={() => openModal("passwordModal", false)}
                />
                <PhoneEditModal
                    isOpen={modalOpen.phoneModal}
                    userPhone={user?.memberPhone ?? ""}
                    onClose={() => openModal("phoneModal", false)}
                />
                <MemberOutModal
                    isOpen={modalOpen.memberOutModal}
                    onSuccess={handleClickMemberOut}
                    onClose={() => openModal("memberOutModal", false)}
                />
                <MemberOutSuccessModal
                    isOpen={modalOpen.memberOutSuccessModal}
                />
            </>
        </div>
    );
};

export default ProfileForm;
