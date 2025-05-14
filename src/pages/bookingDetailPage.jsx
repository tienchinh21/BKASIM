import Header from "@/components/Header/Header";
import ButtonApp from "@/components/Button/ButtonApp";

export default function BookingDetail() {
    const booking = {
        code: "#Abcd35qj",
        name: "Tên khách hàng A",
        time: "15:00–15/01/2025",
        dateCreated: "13/01/2025",
        status: "Chờ xác nhận",
        topic: "Tôi muốn tư vấn dịch vụ SMS Brandname",
        description: "Tôi muốn tư vấn dịch vụ SMS Brandname",
    };

    return (
        <div className="min-h-screen bg-gray-100 pb-6">
            <Header title="Chi tiết đặt lịch" />

            <div className="px-4 pt-4 space-y-4">

                <div className="bg-white rounded shadow px-4 py-3">
                    <div className="flex justify-between items-start mb-1">
                        <p className="text-sm text-gray-800">
                            Mã đặt lịch: <b>{booking.code}</b>
                        </p>
                        <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                            Ngày tạo: {booking.dateCreated}
                        </span>
                    </div>
                    <p className="text-sm text-gray-800">
                        Người đặt: <b>{booking.name}</b>
                    </p>
                    <p className="text-sm text-gray-800">
                        Thời gian đặt: {booking.time}
                    </p>
                    <p className="text-sm">
                        Trạng thái:{" "}
                        <span className="text-orange-500 font-medium">{booking.status}</span>
                    </p>
                </div>


                <div className="bg-white rounded shadow px-4 py-3">
                    <p className="text-sm font-semibold mb-2">Chủ đề</p>
                    <div className="text-sm text-gray-800 border border-gray-300 rounded p-2 bg-white">
                        {booking.topic}
                    </div>
                </div>


                <div className="bg-white rounded shadow px-4 py-3">
                    <p className="text-sm font-semibold mb-2">Mô tả</p>
                    <div className="text-sm text-gray-800 border border-gray-300 rounded p-2 bg-white">
                        {booking.description}
                    </div>
                </div>
            </div>


            <div className="px-4 pt-6">
                <ButtonApp
                    title="Huỷ đặt lịch"
                    variant="outline"
                    fullWidth
                    rounded
                />
            </div>
        </div>
    );
}
