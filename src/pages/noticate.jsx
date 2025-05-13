import {
  Page, Header, Box, Text, Button
} from "zmp-ui";

const notifications = [
  {
    id: 1,
    message: "Đặt lịch của bạn đã được chấp nhận",
    timestamp: "12:46, 16/03/2025",
    action: "Xem chi tiết",
  },
  {
    id: 2,
    message: "Đã tiến hành gửi thông báo ZNS huỷ lịch",
    timestamp: "12:46, 16/03/2025",
    action: null,
  },
];

function NotificationPage() {
  return (
    <Page
    style={{background: 'linear-gradient(135deg,#262C6E, #3993D9)',}}
     className="bg-gradient-to-b from-blue-700 to-blue-500 min-h-screen">
      <Header
        title="THÔNG BÁO"
        backLink={true}
        className="text-white"
        style={{ background: 'linear-gradient(135deg,#3993D9, #262C6E )', }} />

      <div className=" mt-20 px-4 py-2">
        {notifications.map((item, index) => (
          <Box
            key={item.id}
            className={`bg-white p-4 mb-2 rounded-lg ${index < notifications.length - 1 ? 'border-b border-gray-300' : ''
              }`}
          >
            <Text className="font-medium text-black">{item.message}</Text>
            <div className="flex justify-between items-center mt-2">
              <Text size="small" className="text-gray-500">
                {item.timestamp}
              </Text>
              {item.action && (
                <Button
                  size="small"
                  variant="tertiary"
                  className="border text-primary"
                >
                  {item.action}
                </Button>
              )}
            </div>
          </Box>
        ))}
      </div>
    </Page>
  );
}

export default NotificationPage;
