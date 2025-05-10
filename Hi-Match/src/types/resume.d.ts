// 자기소개서
interface ResumeDetailData {
    resumeDate: string;
    resumeTitle: string;
    resumeIMG?: string;
    resumeName: string;
    resumeEngName: string;
    resumeBirthDay: string;
    resumeGender?: string; // F/M
    resumeMail: string;
    resumeTel: string;
    resumeAddress: string;
    resumeAmbition?: string; // 포부 한마디
    resumePortFolio?: string;
    resumeArmyType: string; // 군복무 타입(대상, 비대상, 면제)
    resumeArmyPart?: string; // 소속
    resumeArmyDate?: string; // 입대일
    resumeArmyEnd?: string; // 제대일
    resumeDisability?: string; // 장애명
    resumeDisabilityType?: string; // 장애증상정도
    resumeRewardingPatriotism?: string; // 보훈번호
    resumeSchool: ResumeSchool[]; // 학력
    resumeExperience?: ResumeExperience[]; // 경력
    resumeCertificate?: ResumeCertificate[]; // 자격증
    resumeEducation?: ResumeEducation[]; // 교육
    resumeAward?: ResumeAward[]; // 수상
}

// 학력
interface ResumeSchool {
    schoolName: string;
    schoolMajor?: string; // 학과(고등학생은 null)
    schoolMinor?: string; // 부전공
    schoolMultiple?: string; // 복수전공
    schoolDegree: string; // 입학, 편입
    schoolGPA?: number | string | null; // 학점(고등학생은 null)
    schoolStandardGPA?: number | string | null; // 기준학점
    schoolPart: string; // 학위 구분(검정고시 1, 고등학교 1, 전문학사 2, 학사 3, 석사 4, 박사 5)
    schoolLev: number; // 학위 값
    schoolAdmissionDate: string; // 입학일
    schoolGraduationDate?: string | null; // 졸업일
}

// 경력
interface ResumeExperience {
    expCompanyName: string;
    expPosition: string; // 직책
    expPart: string; // 담당 업무 및 역할 -> 부서
    expAchievement: string; // 주요 성과 및 업적 -> 담당 업무
    expIsCurrent: boolean; // 현재 재직 여부
    expStartDate: string;
    expEndDate?: string; // 문자 X, DateTime 값으로
}

// 수상
interface ResumeAward {
    awaTitle: string; // 수상명
    awaCompetitionName: string;
    awaOrgan: string; // 주최 기관
    awaContent: string;
    awaDate: string;
}

// 자격증
interface ResumeCertificate {
    cerTitle: string;
    cerAuthority: string; // 발행 기관
    cerDate: string;
    cerExpire: string; // 만료일
}

// 교육
interface ResumeEducation {
    eduTitle: string;
    eduOrgan: string; // 교육 기관명
    eduTime: string; // 총 교육시간
    eduStartDate: string;
    eduEndDate: string;
    eduContent: string;
}
