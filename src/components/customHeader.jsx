import { Icon } from "zmp-ui";
import logo from "../static/logo.png"; 

const CustomHeader = () => {
    return (
        <div className="w-1flex items-center justify-between px-3 bg-gradient-to-r from-blue-700 to-blue-500">

            <Icon icon="zi-arrow-left" className="text-white" />
            <img src={logo} alt="BKASIM Mentoring" className="h-6 object-contain" />
            <div className="flex items-center gap-2">
                <Icon icon="zi-more" className="text-white" />
                <Icon icon="zi-close" className="text-white" />
            </div>
        </div>
    );
};

export default CustomHeader;
