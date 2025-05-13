import { Page, Header, Text, Button } from "zmp-ui";
import img3 from '../static/3.png'

function BookingConfirmationPage() {
    return (
        <Page className="bg-white min-h-screen">
            <Header
                title="YÊU CẦU ĐƯỢC GỬI ĐẾN MENTOR"
                backLink={true}
                className="text-white bg-gradient-to-r from-blue-700 to-blue-500" />

            <div className="mt-20 p-4 flex flex-col items-center text-center gap-4">
                {/* Hình minh họa */}
                <img
                    src={img3}// hình minh họa demo
                    alt="booking-confirm"
                    className="w-[80%] max-w-[280px]"
                />

                {/* Nội dung */}
                <Text className="text-black text-base font-medium leading-6">
                    Quý khách sẽ nhận được thông báo Zalo thông tin đặt lịch, nhân viên sẽ liên lạc lại Quý khách qua SĐT nếu thông tin đặt lịch có sự thay đổi
                </Text>

                {/* Nút hành động */}
                <div className="flex flex-col gap-3 w-full mt-4">
                    <Button
                        size="large"
                        fullWidth
                        type="highlight"
                        onClick={() => console.log("Xem đơn đặt lịch")}
                    >
                        Xem chi tiết đơn đặt lịch
                    </Button>

                    <Button
                        size="large"
                        fullWidth
                        variant="tertiary"
                        onClick={() => console.log("Quay lại trang chủ")}
                    >
                        Quay lại Trang chủ
                    </Button>
                </div>
            </div>
        </Page>
    );
}

export default BookingConfirmationPage;
