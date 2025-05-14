// 채용 공고
interface RecruitPostData {
    postingTitle: string; // 공고 제목
    postingPart: string; // 직무
    postingType: string; // 고용 형태(정규직, 계약직, 인턴)
    postingWorkType: string; // 근무 형태
    postingWorkStartTime?: string | null; // 출근 시간
    postingWorkEndTime?: string | null; // 퇴근 시간
    postingSal: string; // 연봉
    postingExperience: string; // 경력
    postingEducation: string; // 학력
    postingLocation: string; // 위치
    postingDeadLine: string; // 공고 마감 일자
    postingContent: string; // 공고 내용
    postingIsFinish: boolean; // 공고 마감 여부
    postingQuestion: PostingQuestion[]; // 자기소개 문항 필수 1개
}

// 자기소개서 항목
interface PostingQuestion {
    question: string; // 자기소개 문항
    questionLength: number; // 자기소개 문항 글자수
}

// 기업 채용 공고 상세 조회 시 postingQuestion와 postingIsFinish는 제외한 데이터
type RecruitPostInfo = Omit<RecruitPostData, "postingQuestion"> & {
    tags?: string[];
};
