import AppHeader from "@/components/Header/AppHeader";
import NewsDetailContent from "@/components/News/NewsDetailContent";
import ButtonApp from "@/components/Button/ButtonApp";
import images from "@/assets/images";

export default function NewsDetailPage() {
    const content = `
📱 Giới thiệu sản phẩm...
🔥 AI tích hợp thông minh...
✅ Sạc nhanh 65W - 🔋 Đạt 70% pin chỉ trong 20 phút...
🧠 Trải nghiệm camera sắc nét...
  `;

    return (
        <div className="h-screen flex flex-col">
            <AppHeader title="CHI TIẾT TIN TỨC" />

            <div className="flex-1 overflow-y-auto bg-white">
                <NewsDetailContent
                    image={images.post1}
                    date="05/03/2025"
                    author="longnguyen"
                    title="Hãng Công Nghệ X Ra Mắt Điện Thoại Mới Với Công Nghệ AI Tích Hợp"
                    content={content}
                />
            </div>

            <div className="p-4 bg-white border-t">
                <ButtonApp size="md" title="Chia sẻ" onClick={() => alert("Chia sẻ!")} />
            </div>
        </div>
    );
}
