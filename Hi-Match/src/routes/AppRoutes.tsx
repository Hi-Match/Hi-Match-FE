import { Route, Routes } from "react-router-dom";
import LoginPage from "@/pages/Login/LoginPage";
import MainPage from "@/pages/Main/MainPage";
import SignUpPage from "@/pages/SignUp/SignUpPage";
import UserSignUp from "@/pages/SignUp/user/UserSignUpForm";
import BizSignUpForm from "@/pages/SignUp/business/BizSignUpForm";
import AuthLayout from "@/layout/AuthLayout";
import FindIdPage from "@/pages/FindID/FindIdPage";
import UserFindIdForm from "@/pages/FindID/user/UserFindIdForm";
import BizFindIdForm from "@/pages/FindID/business/BizFindIdForm";
import UserFindIdSuccess from "@/pages/FindID/user/UserFindIdSuccess";
import BizFindIdSuccess from "@/pages/FindID/business/BizFindIdSuccess";
import FindIdNotfound from "@/pages/FindID/components/FindIdNotfound";
import UserSignUpDone from "@/pages/SignUp/user/UserSignUpDone";
import FindPwPage from "@/pages/FindPw/FindPwPage";
import UserFindPwForm from "@/pages/FindPw/user/UserFindPwForm";
import UserFindPwSuccess from "@/pages/FindPw/user/UserFindPwSuccess";
import BizSignUpDone from "@/pages/SignUp/business/BizSignUpDone";
import BizFindPwForm from "@/pages/FindPw/business/BizFindPwForm";
import BizFindPwSuccess from "@/pages/FindPw/business/BizFindPwSuccess";
import MyPageLayout from "@/layout/MyPageLayout";
import UserHome from "@/pages/MyPage/Home/Home";
import UserProfile from "@/pages/MyPage/Profile/UserProfile";
import UserResume from "@/pages/MyPage/Resume/UserResume";
import UserBookmark from "@/pages/MyPage/Bookmark/UserBookmark";
import PersonalityResult from "@/pages/MyPage/PersonalityResult/PersonalityResult";
import Test from "@/pages/MyPage/Test/Test";
import Application from "@/pages/MyPage/Application/Application";
import ResumeDetail from "@/pages/MyPage/Resume/ResumeDetail/ResumeDetail";
import ResumeWrite from "@/pages/MyPage/Resume/ResumeWrite/ResumeWrite";
import ResumeEdit from "@/pages/MyPage/Resume/ResumeEdit/ResumeEdit";
import CompanyInfo from "@/pages/CompanyInfo/CompanyInfo";
import BizLayout from "@/layout/BizLayout";
import CompanySetting from "@/pages/CompanySetting/CompanySetting";
import JobPostingDetail from "@/pages/JobPostingDetail/JobPostingDetail";
import RecruitPosting from "@/pages/RecruitPosting/RecruitPosting";
import RecruitList from "@/pages/RecruitList/RecruitList";
import RecruitPostDetail from "@/pages/RecruitPostDetail/RecruitPostDetail";
import RecruitPostEdit from "@/pages/RecruitPosting/RecruitPostEdit";
import Applicants from "@/pages/Applicants/Applicants";
import CompanyIdeal from "@/pages/CompanyIdeal/CompanyIdeal";
import PrivateRoute from "./PrivateRoute";
import ApplicantResume from "@/pages/ApplicantResume/ApplicantResume";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/jobs/:id" element={<JobPostingDetail />} />

            <Route element={<AuthLayout />}>
                <Route path="/login" element={<LoginPage />} />

                <Route path="/signup" element={<SignUpPage />}>
                    <Route path="user" element={<UserSignUp />} />
                    <Route path="user/done" element={<UserSignUpDone />} />
                    <Route path="business" element={<BizSignUpForm />} />
                    <Route path="business/done" element={<BizSignUpDone />} />
                </Route>

                <Route path="/findid" element={<FindIdPage />}>
                    <Route path="user" element={<UserFindIdForm />} />
                    <Route path="user/list" element={<UserFindIdSuccess />} />
                    <Route path="user/notfound" element={<FindIdNotfound />} />

                    <Route path="business" element={<BizFindIdForm />} />
                    <Route
                        path="business/list"
                        element={<BizFindIdSuccess />}
                    />
                    <Route
                        path="business/notfound"
                        element={<FindIdNotfound />}
                    />
                </Route>

                <Route path="/findpw" element={<FindPwPage />}>
                    <Route path="user" element={<UserFindPwForm />} />
                    <Route path="user/reset" element={<UserFindPwSuccess />} />
                    <Route path="business" element={<BizFindPwForm />} />
                    <Route
                        path="business/reset"
                        element={<BizFindPwSuccess />}
                    />
                </Route>
            </Route>

            <Route element={<PrivateRoute />}>
                <Route element={<MyPageLayout />}>
                    <Route path="/mypage">
                        <Route path="home" element={<UserHome />} />

                        <Route path="resume" element={<UserResume />} />
                        <Route
                            path="resume/:resumeNo"
                            element={<ResumeDetail />}
                        />
                        <Route path="resume/write" element={<ResumeWrite />} />
                        <Route
                            path="resume/edit/:resumeNo"
                            element={<ResumeEdit />}
                        />

                        <Route path="test" element={<Test />} />
                        <Route
                            path="personality-result"
                            element={<PersonalityResult />}
                        />

                        <Route path="application" element={<Application />} />

                        <Route path="bookmark" element={<UserBookmark />} />
                        <Route path="profile" element={<UserProfile />} />
                    </Route>
                </Route>

                <Route element={<BizLayout />}>
                    <Route path="/company">
                        <Route path="info" element={<CompanyInfo />} />
                        <Route path="setting" element={<CompanySetting />} />

                        <Route path="recruit">
                            <Route
                                path="posting"
                                element={<RecruitPosting />}
                            />
                            <Route path="list" element={<RecruitList />} />
                            <Route
                                path="detail/:postNo"
                                element={<RecruitPostDetail />}
                            />
                            <Route
                                path="edit/:postNo"
                                element={<RecruitPostEdit />}
                            />
                        </Route>

                        <Route path="ideal" element={<CompanyIdeal />} />

                        <Route path="applicants" element={<Applicants />} />
                        <Route
                            path="applicant/resume/:resumeNo"
                            element={<ApplicantResume />}
                        />
                    </Route>
                </Route>
            </Route>
        </Routes>
    );
};

export default AppRoutes;
