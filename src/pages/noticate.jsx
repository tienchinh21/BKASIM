import Container from "@/components/Container/Container";
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


    <Container>
      {notifications.map((item, index) => (
        <NotificationItem
          key={index}
          message={item.message}
          time={item.time}
          buttonText={item.buttonText}
          onClick={() => alert("Đi đến chi tiết")}
        />
      ))}
    </Container>


  );
}
