import { useAuthStore } from "@/store/authStore";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
    const { isAuthenticated } = useAuthStore();

    return isAuthenticated || location.pathname === "/" ? (
        <Outlet />
    ) : (
        <Navigate to="/login" replace />
    );
};

export default PrivateRoute;
