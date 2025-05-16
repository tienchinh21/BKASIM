import HeaderApp from "@/components/Header/Header";
import NotificationItem from "@/components/Notice/NoticeItem";

export default function NotificationPage() {
  const notifications = [
    {
      message: "Đặt lịch của bạn đã được chấp nhận",
      time: "12:46, 16/03/2025",
      buttonText: "Xem chi tiết",
    },
    {
      message: "Đã tiến hành gửi thông báo ZNS huỷ lịch",
      time: "12:46, 16/03/2025",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1E1A85] to-[#3498db]">

      <div className="px-4 pt-4 pb-20">
        {notifications.map((item, index) => (
          <NotificationItem
            key={index}
            message={item.message}
            time={item.time}
            buttonText={item.buttonText}
            onClick={() => alert("Đi đến chi tiết")}
          />
        ))}
      </div>
    </div>
  );
}
