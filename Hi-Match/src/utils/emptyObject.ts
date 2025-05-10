// 배열에 빈 값이 있는지 확인하는 함수
export const isEmptyObject = (object: Record<string, any>) => {
    return Object.values(object).every(val => !val || val.trim?.() === "");
};

// 이력서 학력에 빈 값이 있는지 확인하는 함수
export const isEmptySchool = (school: ResumeSchool): boolean => {
    return (
        school.schoolLev === 0 &&
        Object.entries(school).every(([key, value]) => {
            return key === "schoolLev" || value === "" || value === undefined;
        })
    );
};
