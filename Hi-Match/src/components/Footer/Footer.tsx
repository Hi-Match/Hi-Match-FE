import LogoIcon from "@/assets/images/footer/logo-footer.svg?react";
import MoelLogo from "@/assets/images/footer/moel-logo.jpg";
import HdrkLogo from "@/assets/images/footer/hrdk-logo.png";
import KoshLogo from "@/assets/images/footer/kosh-logo.gif";
import { Link } from "react-router-dom";

const Footer = () => {
    const handleScrollTop = () => {
        window.scrollTo({ top: 0 });
    };

    return (
        <footer className="w-full place-items-center border-t-1 border-solid border-gray-200">
            <div className="flex w-[90%] max-w-7xl justify-between py-12.5">
                <div className="space-y-7.5">
                    <div className="flex items-center justify-between">
                        <Link to="/" onClick={handleScrollTop}>
                            <LogoIcon className="w-40" />
                        </Link>
                    </div>
                    <div className="text-gray01 flex flex-col space-y-5 text-sm">
                        <p>
                            <span>잘부탁드립니다</span>
                            <span className="before:px-2 before:content-['|']">
                                대표자 정은아
                            </span>
                        </p>
                        <p>
                            <span>이메일 &#58; </span>
                            <a
                                href="mailto:eunah0507@naver.com"
                                className="text-gray01 font-normal"
                            >
                                eunah0507@naver.com
                            </a>
                        </p>
                        <p>
                            <span>전화번호 &#58; </span>
                            <a
                                href="tel:010-2087-0112"
                                className="text-gray01 font-normal"
                            >
                                010-2087-0112
                            </a>
                        </p>
                    </div>
                </div>
                <div className="flex flex-col space-y-7.5">
                    <div>
                        <Link
                            to="https://www.2025datacontest.co.kr/"
                            target="_blank"
                            className="text-lg font-semibold text-black"
                        >
                            제4회 고용노동 공공데이터 활용 공모전
                        </Link>
                    </div>
                    <div className="logo_wrapper flex flex-col">
                        <div className="flex items-center space-x-2">
                            <p className="font-semibold text-black">주최</p>
                            <Link
                                to="https://www.moel.go.kr/index.do"
                                target="_blank"
                            >
                                <img
                                    src={MoelLogo}
                                    alt="고용노동부 "
                                    className="w-40"
                                />
                            </Link>
                        </div>
                        <div className="flex items-center space-x-2">
                            <p className="font-semibold text-black">주관</p>
                            <Link
                                to="https://www.hrdkorea.or.kr/"
                                target="_blank"
                            >
                                <img
                                    src={HdrkLogo}
                                    alt="한국산업인력공단"
                                    className="w-40"
                                />
                            </Link>
                            <Link
                                to="https://www.kosha.or.kr/kosha/index.do"
                                target="_blank"
                            >
                                <img
                                    src={KoshLogo}
                                    alt="안전보건공단"
                                    className="w-40"
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid w-full place-items-center border-t-1 border-solid border-gray-100 py-7.5">
                <div className="text-gray01 flex w-[90%] max-w-318 justify-between space-y-5 text-sm">
                    <p>&copy; Hi Match</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
