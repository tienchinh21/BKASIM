// BookingMentoring.jsx
import StepperItem from "@/components/Form/StepperItem";
import FormInput from "@/components/Form/FormInput";
import ButtonApp from "@/components/Button/ButtonApp";
import Header from "@/components/Header/Header";
import useAppNavigation from "@/hooks/useNavigation";
import { useState } from "react";
import BookingCard from "@/components/Card/BookingCard";

const tabs = ["Lịch hẹn mới", "Lịch sử"];

export default function BookingMentoring() {
    const { goToConfirm, goToDetailBooking } = useAppNavigation();
    const [activeTab, setActiveTab] = useState("Lịch hẹn mới");

    const bookings = [
        { code: "#Abcd35qj", name: "Tên khách hàng A", time: "15:00-15/01/2025", status: "Chờ xác nhận", date: "13/01/2025" },
        { code: "#Abcd35qj", name: "Tên khách hàng A", time: "15:00-15/01/2025", status: "Đã xác nhận", date: "13/01/2025" },
        { code: "#Abcd35qj", name: "Tên khách hàng A", time: "15:00-15/01/2025", status: "Hoàn thành", date: "13/01/2025" },
        { code: "#Abcd35qj", name: "Tên khách hàng A", time: "15:00-15/01/2025", status: "Đã huỷ", date: "13/01/2025" },
    ];

    return (
        <div className="min-h-screen bg-white pb-10 text-black">

            <div className="flex border-b px-4 pt-4">
                {tabs.map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`text-sm font-medium px-4 pb-2 ${activeTab === tab ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-400"}`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {activeTab === "Lịch hẹn mới" ? (
                <div className="pt-5 space-y-6 px-4">
                    <StepperItem step={1} label="Nhập chủ đề">
                        <FormInput placeholder="Nhập chủ đề" icon="zi-pen" />
                    </StepperItem>

                    <StepperItem step={2} label="Nhập mô tả">
                        <FormInput placeholder="Nhập mô tả" icon="zi-pen" />
                    </StepperItem>

                    <StepperItem step={3} label="Chọn ngày giờ" required>
                        <button className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-100 text-left text-sm text-gray-700 shadow-sm">
                            Xem thời gian đặt lịch
                        </button>
                    </StepperItem>

                    <p className="text-xs text-gray-500 leading-relaxed">
                        Quý khách sẽ nhận được thông báo Zalo thông tin đặt lịch. Nhân viên sẽ liên hệ lại nếu có thay đổi.
                    </p>

                    <div className="pt-2">
                        <ButtonApp
                            title="Chốt Đặt lịch"
                            fullWidth
                            rounded
                            gradient
                            size="lg"
                            onClick={goToConfirm}
                        />
                    </div>
                </div>
            ) : (
                <div className="px-4 pt-4 space-y-4">
                    {/* Bộ lọc */}
                    <div className="space-y-2">
                        <div className="flex gap-2">
                            <input type="date" className="w-full border border-gray-300 rounded px-2 py-1 text-sm" />
                            <input type="date" className="w-full border border-gray-300 rounded px-2 py-1 text-sm" />
                        </div>
                        <select className="w-full border border-gray-300 rounded px-2 py-1 text-sm">
                            <option>Theo trạng thái</option>
                            <option>Chờ xác nhận</option>
                            <option>Đã xác nhận</option>
                            <option>Hoàn thành</option>
                            <option>Đã huỷ</option>
                        </select>
                    </div>

                    {/* Danh sách lịch sử */}
                    {bookings.map((b, i) => (
                        <BookingCard onClick={goToDetailBooking} key={i} booking={b} />
                    ))}
                </div>
            )}
        </div>
    );
}
