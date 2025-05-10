import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";

const App = () => {
    return (
        <>
            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 4000,
                    style: {
                        padding: "16px",
                        borderRadius: "8px",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                        fontSize: "16px",
                        maxWidth: "400px",
                    },
                    success: {
                        iconTheme: {
                            primary: "#4CAF50",
                            secondary: "white",
                        },
                    },
                    error: {
                        iconTheme: {
                            primary: "#EF4444",
                            secondary: "white",
                        },
                    },
                }}
            />
            <AppRoutes />
        </>
    );
};

export default App;
