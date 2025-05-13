import { Page, Header, Box, Text, Button } from "zmp-ui";

function BookingDetailPage() {
    return (
        <Page className="bg-[#D6D6D6] min-h-screen">
            <Header
                title="CHI TIẾT ĐẶT LỊCH"
                backLink={true}
                className="text-white bg-gradient-to-r from-blue-700 to-blue-500"
            />

            <div className=" py-4 flex flex-col gap-4">

                <Box className="mt-20 bg-white  p-4 shadow">
                    <div className="flex justify-between items-center mb-2">
                        <Text bold>Thông tin đặt lịch</Text>
                        <Text
                            style={{ background: "#D6D6D6", padding: 4, borderRadius: 4 }}
                            size="small"
                            className="text-gray-500">
                            Ngày tạo 13/01/2025
                        </Text>
                    </div>

                    <Text size="small">
                        <b>Mã đặt lịch:</b> <span className="text-blue-600">#Abcd35gj</span>
                    </Text>
                    <Text size="small">
                        <b>Người đặt lịch:</b> Tên khách hàng A
                    </Text>
                    <Text size="small">
                        <b>Thời gian đặt lịch:</b> 15:00 - 15/01/2025
                    </Text>
                    <Text size="small">
                        <b>Trạng thái:</b>{" "}
                        <span className="text-red-500 font-medium">Chờ xác nhận</span>
                    </Text>
                </Box>

                {/* Chủ đề */}
                <Box className="bg-white p-4 shadow">
                    <Text bold className="mb-1">Chủ đề</Text>
                    {/* <Textarea
                        readOnly
                        value="Tôi muốn tư vấn dịch vụ SMS Brandname"
                        className="bg-[#f0f5ff]"
                    /> */}
                </Box>

                {/* Mô tả */}
                <Box className="bg-white p-4 shadow">
                    <Text bold className="mb-1">Mô tả</Text>
                    {/* <Textarea
                        readOnly
                        value="Tôi muốn tư vấn dịch vụ SMS Brandname"
                        className="bg-[#f0f5ff]"
                    /> */}
                </Box>

                {/* Nút huỷ */}
                <div className="mt-4">
                    <Button
                        fullWidth
                        variant="secondary"
                        className="text-red-500 border border-red-400"
                        onClick={() => console.log("Huỷ lịch")}
                    >
                        Huỷ đặt lịch
                    </Button>
                </div>
            </div>
        </Page>
    );
}

export default BookingDetailPage;
