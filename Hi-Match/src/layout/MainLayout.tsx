import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { ReactNode } from "react";

const MainLayout = ({ children }: { children: ReactNode }) => {
    return (
        <main className="main_wrapper">
            <Header />
            <section className="pt-12.5 pb-50">{children}</section>
            <Footer />
        </main>
    );
};

export default MainLayout; 

