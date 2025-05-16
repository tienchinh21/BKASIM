import { Page, Text, Button } from "zmp-ui";
import img3 from '../static/3.png'
import Header from "@/components/Header/Header";
import ButtonApp from "@/components/Button/ButtonApp";
import useAppNavigation from "@/hooks/useNavigation";
import Container from "@/components/Container/Container";

function BookingConfirmationPage() {
    const { goToDetailBooking } = useAppNavigation();
    return (
        <Container className="h-[900px]">
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
                    <ButtonApp onClick={goToDetailBooking} gradient variant="" title="Xem chi tiết đơn đặt lịch" />
                    <ButtonApp variant="outline" title=" Quay lại Trang chủ" />
                </div>
            </div>
        </Container>

    );
}

export default BookingConfirmationPage;
