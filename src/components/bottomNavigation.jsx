import { useLocation, useNavigate } from "react-router-dom";
import { Icon } from "zmp-ui";

const navItems = [
    { path: "/", label: "Trang chủ", icon: "zi-home" },
    { path: "/SearchPage", label: "Tìm kiếm", icon: "zi-search" },
    { path: "/Booking", label: "Đặt lịch", icon: "zi-calendar" },
    { path: "/Noticate", label: "Thông báo", icon: "zi-notification" },
    { path: "/Setting", label: "Cá nhân", icon: "zi-user" },
];


const HIDDEN_PATHS = [
    "/newsPost",
    "/news-detail",
    "/editprofile",
    "/mentee",
    "/Regis",
    "/mentor",
    "/booking-detail",
    "/booking-confirm",
];

export default function BottomNav() {
    const location = useLocation();
    const navigate = useNavigate();

    const isHidden = HIDDEN_PATHS.includes(location.pathname);
    if (isHidden) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md flex justify-around py-2 z-50">
            {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                    <button
                        key={item.path}
                        onClick={() => navigate(item.path)}
                        className={`flex flex-col items-center text-xs ${isActive ? "text-blue-600 font-semibold" : "text-gray-500"
                            }`}
                    >
                        <Icon icon={item.icon} className="text-lg" />
                        <span className="mt-1">{item.label}</span>
                    </button>
                );
            })}
        </div>
    );
}
