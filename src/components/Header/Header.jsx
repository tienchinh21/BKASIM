import { memo } from "react";
import { FiX, FiMoreHorizontal } from "react-icons/fi";
import useAppNavigation from "@/hooks/useNavigation";
import { useLocation } from "zmp-ui";
import { useNavigate } from "react-router";
import images from "@/assets/images";

function AppHeader({ logo = null }) {
    const location = useLocation();
    const navigate = useNavigate();

    const { goBack, goHome } = useAppNavigation();

    const isHome = location.pathname === "/";

    const title = location.pathname
        .slice(1)
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());

    return (
        <div className="relative bg-gradient-to-b from-[#1E1A85] to-[#3498db] h-full px-4 py-4 flex items-center justify-between text-white">


            <button
                onClick={goBack}
                className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-md"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="#1E1A85"
                    strokeWidth="2"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
            </button>

          
            <div className="absolute left-1/2 transform -translate-x-1/2 text-sm font-semibold text-center uppercase">
                {isHome ? (
                    <img src={images.logo} alt="logo" className="h-10 object-contain mx-auto" />
                ) : (
                    title
                )}
            </div>


            <div className="flex items-center space-x-2">
                <button className="p-1">
                    <FiMoreHorizontal size={18} />
                </button>
                <button onClick={goHome} className="p-1">
                    <FiX size={18} />
                </button>
            </div>
        </div>
    );
}

export default memo(AppHeader);
