import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";
import SuccessIcon from "@/assets/icons/check-icon.svg?react";
import ErrorIcon from "@/assets/icons/error-icon.svg?react";

function App() {
    return (
        <>
            <AppRoutes />
            <Toaster
                position="bottom-center"
                reverseOrder={false}
                toastOptions={{
                    style: {
                        background: "#333",
                        color: "#fff",
                        fontSize: "15px",
                        fontWeight: "600",
                        borderRadius: "50px",
                    },
                    success: {
                        icon: (
                            <SuccessIcon className="h-5 w-5 fill-green-500" />
                        ),
                        className: "border-1 border-solid border-green-500",
                    },
                    error: {
                        icon: <ErrorIcon className="h-5 w-5 fill-red-600" />,
                        className: "border-1 border-solid border-red-600",
                    },
                }}
            />
        </>
    );
}

export default App;
