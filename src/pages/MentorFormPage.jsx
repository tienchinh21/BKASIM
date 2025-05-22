import { useState } from "react";
import Header from "@/components/Header/Header";
import FormInput from "@/components/Form/FormInput";
import SectionTitle from "@/components/Form/SectionTitle";
import FormFooterButton from "@/components/Footer/FormFooterButton";
import ZaloConsentModal from "@/components/Modal/ZaloConsentModal";
import Container from "@/components/Container/Container";

export default function MentorFormPage() {
    const [gender, setGender] = useState("");
    const [showModal, setShowModal] = useState(false);

    const handleSubmit = () => {
        alert("Gửi thành công!");
    };

    const handleFocusPhone = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleConfirmModal = () => {
        setShowModal(false);
        console.log("Cho phép truy cập thông tin Zalo");
    };

    return (
        <Container>
            <div className="flex-1 overflow-y-auto px-4 pt-6 pb-6">
                <h2 className="text-center text-lg font-semibold mb-1">Trở thành Mentee</h2>
                <p className="text-center text-sm mb-6">Nhập thông tin của bạn</p>

                <SectionTitle title="Thông tin cá nhân" />
                <FormInput label="Họ và tên" required placeholder="Nguyễn Văn A" />
                <FormInput
                    label="Số điện thoại người nhận"
                    required
                    placeholder="0933209346"
                    type="tel"
                    onFocus={handleFocusPhone}
                />
                <FormInput label="Email" placeholder="Nhập địa chỉ email" type="email" />
                <FormInput label="Ngày sinh" type="date" />

                <div className="mb-4">
                    <label className="block mb-1 text-sm">Giới tính</label>
                    <select
                        className="w-full px-4 py-2 rounded bg-white text-black focus:outline-none"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <option value="">Chọn giới tính</option>
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                        <option value="Khác">Khác</option>
                    </select>
                </div>

                <SectionTitle title="Thông tin doanh nghiệp" />
                <FormInput label="Tên công ty" placeholder="Nhập tên công ty" />
                <FormInput label="Chức vụ" placeholder="Nhập chức vụ" />
            </div>

            {/* <FormFooterButton onClick={handleSubmit} /> */}

            <ZaloConsentModal
                isOpen={showModal}
                onClose={handleCloseModal}
                onConfirm={handleConfirmModal}
                name="Nguyễn Văn A"
                phone="0933209346"
            />
        </Container>

    );
}
