import { memo } from "react";
import Button from "./Button/buttonMedium";

function PromoCard(
    {
        title,
        logo ='',
        handleRegis,
        ...props
    }) {
    return (
        <div className="w-[95%] h-[10vh] mt-24 bg-white rounded-lg flex items-center justify-between px-4 text-black">
            <img src={logo} alt="left-icon" className="h-[80%]" />
            <span className="text-sm font-semibold ml-5">
                {title}
            </span>
            <Button
                className="bg-[linear-gradient(135deg,#262C6E,#3993D9)] max-w-[150px]"
                onClick={handleRegis}
            >
                Đăng kí ngay
            </Button>
        </div>
    );
}
export default memo(PromoCard)