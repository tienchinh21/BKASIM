import { Link, useLocation } from "react-router-dom";
import { Icon } from "zmp-ui"; // nếu bạn vẫn muốn dùng icon từ zmp-ui

const navItems = [
    { path: "/", label: "Trang chủ", icon: "zi-home" },
    { path: "/SearchPage", label: "Tìm kiếm", icon: "zi-search" },
    { path: "/Noticate", label: "Thông báo", icon: "zi-notification" },
    { path: "/setting", label: "Cá nhân", icon: "zi-user" },
];

const BottomNav = () => {
    const location = useLocation();

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md flex justify-around py-2 z-50">
            {navItems.map((item) => (
                <Link to={item.path} key={item.path} className="flex flex-col items-center text-xs text-gray-600">
                    <Icon icon={item.icon} className={`${location.pathname === item.path ? "text-blue-600" : ""}`} />
                    <span>{item.label}</span>
                </Link>
            ))}
        </div>
    );
};

export default BottomNav;
