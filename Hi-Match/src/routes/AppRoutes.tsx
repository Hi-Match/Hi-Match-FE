import MainPage from "@/pages/Main/MainPage";
import { Route, Routes } from "react-router-dom";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
        </Routes>
    );
};

export default AppRoutes;
