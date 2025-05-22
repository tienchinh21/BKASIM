import StepperItem from "@/components/Form/StepperItem";
import FormInput from "@/components/Form/FormInput";
import ButtonApp from "@/components/Button/ButtonApp";
import Header from "@/components/Header/Header";
import useAppNavigation from "@/hooks/useNavigation";
import { useState } from "react";
import BookingCard from "@/components/Card/BookingCard";
import Container from "@/components/Container/Container";

const tabs = ["Lịch hẹn mới", "Lịch sử"];

export default function BookingMentoring() {
    const { goToConfirm, goToDetailBooking } = useAppNavigation();
    const [currentStep, setCurrentStep] = useState(0);
    const [activeTab, setActiveTab] = useState("Lịch hẹn mới");
    const [isCompleted, setIsCompleted] = useState(false);
    const [formData, setFormData] = useState({
        subject: "",
        time: "",
        confirmNote: "",
    });

    const bookings = [
        { code: "#Abcd35qj", name: "Tên khách hàng A", time: "15:00-15/01/2025", status: "Chờ xác nhận", date: "13/01/2025" },
        { code: "#Abcd35qj", name: "Tên khách hàng A", time: "15:00-15/01/2025", status: "Đã xác nhận", date: "13/01/2025" },
        { code: "#Abcd35qj", name: "Tên khách hàng A", time: "15:00-15/01/2025", status: "Hoàn thành", date: "13/01/2025" },
        { code: "#Abcd35qj", name: "Tên khách hàng A", time: "15:00-15/01/2025", status: "Đã huỷ", date: "13/01/2025" },
    ];

    const steps = [
        { label: "Nhập chủ đề" },
        { label: "Nhập thời gian" },
        { label: "Xác nhận thông tin" },
    ];

    const handleComplete = () => {
        if (!formData.subject.trim() || !formData.time.trim() || !formData.confirmNote.trim()) {
            alert("Vui lòng điền đầy đủ thông tin.");
            return;
        }
        setIsCompleted(true);
        setCurrentStep(steps.length);


    };

    const handleChangeStep =()=>{
        console.log('hhhjj')
    }

    return (
        <Container bg="light">
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
                <div className="pt-5 px-4">
                    {steps.map((step, index) => (
                        <StepperItem
                            key={index}
                            label={step.label}
                            isActive={!isCompleted && index === currentStep}
                            isDone={isCompleted || index < currentStep}
                            disabled={isCompleted}
                            onClick={() => setCurrentStep(index)}
                        />
                    ))}

                    <div className="flex  flex-row ">

                        <div className="relative flex flex-col items-start ml-[8px]">
                            {
                                !isCompleted ? (<div> <div className="w-[2px] h-[70px] bg-gray-300"></div>
                                    <div className="w-8 h-[2px] bg-gray-300 ml-[2px]"></div></div>) :
                                    (<div>
                                        <div className="w-[2px] h-[70px] bg-[#3993D9]"></div>
                                        <div className="w-8 h-[2px] bg-[#3993D9]"></div>
                                    </div>)
                            }

                        </div>

                        <div className="flex flex-col">
                            <p className="text-xs text-gray-500 leading-relaxed mb-5">
                                Quý khách sẽ nhận được thông báo Zalo thông tin đặt lịch, nhân viên sẽ liên lạc lại Quý khách qua SĐT nếu thông tin đặt lịch có sự thay đổi
                            </p>
                            <div className="">
                                <ButtonApp
                                    title="Chốt Đặt lịch"
                                    fullWidth
                                    rounded
                                    gradient
                                    size="md"
                                    onClick={handleComplete}
                                />
                            </div>
                        </div>

                    </div>

                </div>
            ) : (
                <div className="px-4 pt-4 space-y-4">
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

                    {bookings.map((b, i) => (
                        <BookingCard onClick={goToDetailBooking} key={i} booking={b} />
                    ))}
                </div>
            )}
        </Container>
    );
}
