import { useState } from "react";
import { Page, Header, Text, Button, Modal } from "zmp-ui";

function NewsDetailPage() {
    const [open, setOpen] = useState(false);

    return (
        <Page className="bg-[#f3f5fc] min-h-screen">
            <Header
                title="CHI TIẾT TIN TỨC"
                backLink={true}
                className="text-white bg-gradient-to-r from-blue-700 to-blue-500"
            />

            <div className="p-4 pb-20 flex flex-col gap-3 bg-white">
                {/* Thông tin đầu bài */}
                <Text size="small" className="text-gray-500">
                    05/02/2025 &nbsp; Bởi longnguyen
                </Text>

               
                <img
                    src="https://cdn.tgdd.vn/Products/Images/42/305659/s16/iphone-15-pro-max-blue-thumbtz-650x650.png"
                    alt="news"
                    className="mt-4 w-full rounded-lg"
                />

                {/* Nội dung chi tiết */}
                <div className="flex flex-col gap-4 text-[15px] leading-[1.6] mt-2">
                    <div>
                        <Text bold className="text-blue-800">📢 Giới thiệu sản phẩm</Text>
                        <Text>
                            Hãng công nghệ X vừa công bố mẫu điện thoại thông minh XPhone AI với nhiều cải tiến vượt trội về hiệu suất, camera và khả năng tối ưu hoá bằng trí tuệ nhân tạo (AI). Đây là bước tiến quan trọng trong việc mang lại trải nghiệm mượt mà cho người dùng.
                        </Text>
                    </div>

                    <div>
                        <Text bold className="text-blue-800">✅ Điểm nổi bật của XPhone AI:</Text>
                        <ul className="list-disc pl-5 mt-1">
                            <li>🔋 Chip AI thế hệ mới: Giúp tăng tốc độ xử lý, nhận diện hình ảnh & nội dung tốt hơn.</li>
                            <li>📸 Camera AI: Tự động nhận diện cảnh vật, điều chỉnh ánh sáng và màu sắc phù hợp hơn.</li>
                            <li>🔋 Pin siêu bền: Công nghệ tối ưu giúp kéo dài thời gian sử dụng lên đến 2 ngày.</li>
                            <li>📱 Màn hình OLED 120Hz: Hiển thị cực sắc nét và mượt mà.</li>
                            <li>⚡ Sạc nhanh 65W 🔋: Chỉ cần sạc 70% pin chỉ trong 20 phút.</li>
                        </ul>
                    </div>

                    <div>
                        <Text bold className="text-blue-800">📸 Trải nghiệm camera AI đỉnh cao</Text>
                        <Text>
                            Với cảm biến camera 50MP và AI Vision Pro, hình ảnh được xử lý chi tiết, độ sâu tốt hơn và màu sắc trung thực. Tất cả mang lại trải nghiệm hình ảnh cao cấp và ấn tượng.
                        </Text>
                    </div>
                </div>

                {/* Nút chia sẻ */}
                <Button
                    fullWidth
                    type="highlight"
                    className="mt-4 "
                    onClick={() => setOpen(true)}
                >
                    Chia sẻ
                </Button>
            </div>

            {/* Modal chia sẻ */}
            <Modal
                visible={open}
                onClose={() => setOpen(false)}
                title="Chia sẻ bài viết"
                description="Đừng quên chia sẻ bài viết này với bạn bè để cùng nhau khám phá thêm nhiều thông tin thú vị"
            >
                <div className="p-4 flex flex-col items-center gap-3">
                    <img
                        src="https://placehold.co/300x120/png?text=Thumbnail"
                        alt="share-img"
                        className="rounded-md w-full"
                    />

                    <div className="flex gap-3 w-full mt-3">
                        <Button
                            className="flex-1"
                            variant="secondary"
                            onClick={() => {
                                navigator.clipboard.writeText(window.location.href);
                                alert("Đã sao chép liên kết");
                            }}
                        >
                            📋 Sao chép
                        </Button>

                        <Button
                            className="flex-1"
                            type="highlight"
                            onClick={() => alert("Chia sẻ qua Zalo")}
                        >
                            💬 Chia sẻ Zalo
                        </Button>
                    </div>
                </div>
            </Modal>
        </Page>
    );
}

export default NewsDetailPage;
