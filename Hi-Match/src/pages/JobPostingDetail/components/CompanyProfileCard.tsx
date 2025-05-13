import { Link } from "react-router-dom";
import JobSummaryCell from "./JobSummaryCell";
import defaultCompanyLogo from "@/assets/images/default-company-logo.png";

const CompanyProfileCard = ({ company }: { company: CompanyInfo | null }) => {
    return (
        <aside className="relative mt-10 h-fit w-[300px] rounded-md border border-gray-200 p-5 pt-14">
            <img
                src={company ? company.companyLogo : defaultCompanyLogo}
                alt=""
                className="absolute top-0 left-0 h-20 w-20 translate-x-1/4 -translate-y-1/2 rounded-sm object-cover shadow-sm"
            />
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">
                    {company ? company.companyName : "기업 정보 없음"}
                </h3>
                <hr className="border-gray-200" />
                <ul className="flex flex-col justify-between">
                    <JobSummaryCell
                        title="산업"
                        content={
                            company ? company.companyIndustry : "기업 정보 없음"
                        }
                        className="w-full"
                    />
                    <JobSummaryCell
                        title="근무지역"
                        content={
                            company ? company.companyAddress : "기업 정보 없음"
                        }
                        className="w-full"
                    />
                    <JobSummaryCell
                        title="대표이사"
                        content={
                            company
                                ? company.companyManagerName
                                : "기업 정보 없음"
                        }
                        className="w-full"
                    />
                    <JobSummaryCell
                        title="사원수"
                        content={
                            company ? company.companyEmployee : "기업 정보 없음"
                        }
                        className="w-full"
                    />
                    <JobSummaryCell
                        title="홈페이지"
                        content={
                            company ? company.companyURL : "기업 정보 없음"
                        }
                        className="w-full"
                    />
                </ul>
                <button className="w-full cursor-pointer rounded-md border border-gray-200 p-3 text-sm text-gray-500 hover:bg-gray-100">
                    <Link
                        className="text-inherit"
                        to={company ? company.companyURL : ""}
                    >
                        기업 정보 더보기
                    </Link>
                </button>
            </div>
        </aside>
    );
};

export default CompanyProfileCard;
