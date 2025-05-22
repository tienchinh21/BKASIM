import ButtonApp from "@/components/Button/ButtonApp";

const statusColor = {
    "Chờ xác nhận": "bg-orange-500",
    "Đã xác nhận": "bg-blue-500",
    "Hoàn thành": "bg-green-500",
    "Đã huỷ": "bg-red-500",
};

export default function BookingCard({ booking, onClick }) {
    return (
        <div className="rounded border border-gray-200 shadow-sm p-3 bg-white">
            <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-semibold text-gray-700">Mã đặt lịch: {booking.code}</p>
                <span className={`text-xs text-white px-2 py-1 rounded ${statusColor[booking.status]}`}>
                    {booking.status}
                </span>
            </div>
            <p className="text-sm text-gray-700">Người đặt: <b>{booking.name}</b></p>
            <p className="text-sm text-gray-700">Thời gian đặt: {booking.time}</p>
            <p className="text-sm text-gray-700 mb-2">Ngày tạo: {booking.date}</p>
            <ButtonApp
                onClick={onClick}
                title="Xem chi tiết đặt lịch"
                gradient
                rounded
                fullWidth
                size="md"
            />
        </div>
    );
}
