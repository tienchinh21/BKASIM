import Header from "@/components/Header/Header";
import FormInput from "@/components/Form/FormInput";
import ButtonApp from "@/components/Button/ButtonApp";
import { useState } from "react";

export default function EditProfilePage() {
    const [gender, setGender] = useState("");
    const [mbti, setMbti] = useState("");

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#1E1A85] to-[#3498db] text-white pb-20">
            <Header title="Chỉnh sửa thông tin" />

            <div className="flex justify-center mt-4">
                <div className="relative">
                    <img
                        src="https://i.pravatar.cc/120"
                        className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
                        alt="avatar"
                    />
                </div>
            </div>

            <div className="px-4 pt-4 space-y-6">
                {/* Thông tin cá nhân */}
                <div className="bg-white rounded-xl p-4 text-black space-y-3 shadow">
                    <h3 className="text-sm font-semibold text-[#1E1A85]">Thông tin cá nhân</h3>
                    <FormInput label="Họ và tên" placeholder="Nguyễn Văn A" required />
                    <FormInput label="Số điện thoại" placeholder="0933209346" required />
                    <FormInput label="Email" type="email" placeholder="nguyenvana@gmail.com" />

                    {/* Dropdown giới tính */}
                    <div>
                        <label className="text-sm text-black font-medium mb-1 block">Giới tính</label>
                        <select
                            className="w-full px-3 py-2 rounded border border-gray-300 text-sm text-black"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                        >
                            <option value="">Chọn giới tính</option>
                            <option>Nam</option>
                            <option>Nữ</option>
                            <option>Khác</option>
                        </select>
                    </div>

                    {/* Dropdown MBTI */}
                    <div>
                        <label className="text-sm text-black font-medium mb-1 block">MBTI/DISC</label>
                        <select
                            className="w-full px-3 py-2 rounded border border-gray-300 text-sm text-black"
                            value={mbti}
                            onChange={(e) => setMbti(e.target.value)}
                        >
                            <option value="">Chọn kết quả MBTI/DISC</option>
                            <option>INTJ</option>
                            <option>ENFP</option>
                            <option>DISC - D</option>
                            <option>DISC - I</option>
                            <option>DISC - S</option>
                            <option>DISC - C</option>
                        </select>
                    </div>
                </div>

                {/* Thông tin doanh nghiệp */}
                <div className="bg-white rounded-xl p-4 text-black space-y-3 shadow">
                    <h3 className="text-sm font-semibold text-[#1E1A85]">Thông tin doanh nghiệp</h3>
                    <FormInput label="Tên công ty" placeholder="Công ty Cổ phần ABC" />
                    <FormInput label="Chức vụ" placeholder="Giám đốc điều hành" />
                    <FormInput label="Kinh nghiệm" placeholder="10 năm kinh nghiệm" />
                </div>

                {/* Nút lưu */}
                <ButtonApp
                    title="Lưu"
                    fullWidth
                    gradient
                    rounded
                    size="lg"
                    onClick={() => alert("Lưu thông tin thành công")}
                />
            </div>
        </div>
    );
}
