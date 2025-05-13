import {
    Page, Header, Input, Button, Text
} from "zmp-ui";
import { useState } from "react";

function MenteeFormPage() {
    const [form, setForm] = useState({
        name: "",
        phone: "",
        email: "",
        dob: "",
        gender: "",
        company: "",
        position: "",
    });

    const handleChange = (field) => (e) => {
        setForm({ ...form, [field]: e.target.value });
    };

    return (
        <Page
            style={{ background: 'linear-gradient(135deg,#262C6E , #3993D9)' }}
            className="bg-gradient-to-b from-blue-700 to-blue-500 min-h-screen">
            <Header
                title="ĐĂNG KÝ"
                backLink={true}
                style={{ background: 'linear-gradient(135deg, #3993D9, #262C6E )' }}
                className="text-white" />

            <div className="mt-20 px-4 py-3 text-white">
                {/* <Title size="medium" className="text-center">Trở thành Mentee</Title> */}
                <Text className="text-center mb-4">Trở thành Mentee</Text>
                <Text className="text-center mb-4">Nhập thông tin của bạn</Text>

                {/* Thông tin cá nhân */}
                <div className=" rounded-xl p-4 text-black mb-4">
                    <Text className="text-white" bold>Thông tin cá nhân</Text>

                    <Input label="Họ và tên" value={form.name} onChange={handleChange("name")} />
                    <Input label="Số điện thoại" type="tel" value={form.phone} onChange={handleChange("phone")} />
                    <Input label="Email" type="email" value={form.email} onChange={handleChange("email")} />
                    <Input label="Ngày sinh" type="date" value={form.dob} onChange={handleChange("dob")} />

                    <label className="block mt-2 mb-1 text-sm">Giới tính</label>
                    <select
                        value={form.gender}
                        onChange={handleChange("gender")}
                        className="w-full p-2 border rounded-lg"
                    >
                        <option value="">Chọn giới tính</option>
                        <option value="male">Nam</option>
                        <option value="female">Nữ</option>
                        <option value="other">Khác</option>
                    </select>
                </div>

                {/* Thông tin doanh nghiệp */}
                <div className=" rounded-xl p-4 text-black">
                    <Text className="text-white" bold>Thông tin doanh nghiệp</Text>
                    <Input label="Tên công ty" value={form.company} onChange={handleChange("company")} />
                    <Input label="Chức vụ" value={form.position} onChange={handleChange("position")} />
                </div>

                <Button
                    className="mt-6"
                    fullWidth
                    type="highlight"
                    onClick={() => console.log("Dữ liệu đã nhập:", form)}
                >
                    Xác nhận
                </Button>
            </div>
        </Page>
    );
}

export default MenteeFormPage;
