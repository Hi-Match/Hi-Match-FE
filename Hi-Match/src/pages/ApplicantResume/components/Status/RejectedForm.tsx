const RejectedForm = () => {
    return (
        <div className="rejected_form space-y-12.5">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-black">
                    지원자 상태
                </h3>
                <span className="flex-center h-11 rounded-[22px] bg-red-400 px-5 text-lg font-semibold text-white">
                    불합격
                </span>
            </div>
        </div>
    );
};

export default RejectedForm;
