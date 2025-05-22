import useAppNavigation from "@/hooks/useNavigation";
import ButtonApp from "../Button/ButtonApp";
import images from "@/assets/images";

export default function LoginRequireModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    const { goToRegis } = useAppNavigation();

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-end justify-center z-50">
            <div className="bg-white rounded-t-2xl w-full p-5">
                <div className="flex justify-center mb-3">
                    <img src={images.logoSecond} alt="logo" className="h-40" />
                </div>

                <h2 className="text-center font-semibold text-black text-base mb-2">
                    Trở thành thành viên để sử dụng tính năng
                </h2>
                <p className="text-center text-gray-600 text-sm mb-4">
                    Để đặt lịch Monitoring, bạn cần trở thành thành viên của chúng tôi. Tính năng sẽ sẵn sàng khi bạn đã xác thực tài khoản.
                </p>

                <div className="flex justify-between space-x-2">
                    <ButtonApp
                        title="Từ chối"
                        variant="secondary"
                        fullWidth
                        onClick={onClose}
                    />
                    <ButtonApp
                        title="Đăng ký"
                        variant="primary"
                        fullWidth
                        onClick={goToRegis}
                    />
                </div>
            </div>
        </div>
    );
}
