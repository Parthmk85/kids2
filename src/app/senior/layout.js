import Navbar from "@/components/Navbar";
import Mascot from "@/components/Mascot";

export default function SeniorLayout({ children }) {
    return (
        <>
            <Navbar />
            <Mascot />
            {children}
        </>
    );
}
