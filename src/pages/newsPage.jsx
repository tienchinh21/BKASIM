import AppHeader from "@/components/Header/Header";
import NewsCard from "@/components/News/NewsCard";
import useAppNavigation from "@/hooks/useNavigation";
import { useState } from "react";
import images from "@/assets/images";

export default function NewsPage() {
    const { goToNewsDetailPage } = useAppNavigation();

    const categories = [
        { id: "all", label: "Tất cả" },
        { id: "cat1", label: "Danh mục 1" },
        { id: "cat2", label: "Danh mục 2" },
    ];

    const [activeCategory, setActiveCategory] = useState("all");

    return (
        <div className="flex flex-col flex-1"> 
            <div className="flex-1 overflow-y-auto bg-white">
                {/* Tabs danh mục */}
                <div className="flex overflow-x-auto px-4 gap-4 py-2 bg-white border-b">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`text-sm whitespace-nowrap ${activeCategory === cat.id
                                ? "text-blue-600 font-semibold"
                                : "text-gray-500"
                                }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Search bar */}
                <div className="px-4 py-2 bg-white">
                    <input
                        type="text"
                        placeholder="Tìm kiếm nhanh"
                        className="w-full border rounded px-3 py-2 text-sm"
                    />
                </div>

                {/* Danh sách bài viết */}
                <div className="px-4 space-y-4 pb-4">
                    {[...Array(15)].map((_, idx) => (
                        <NewsCard
                            key={idx}
                            image={images.post1}
                            date="05/03/2024"
                            title="Hãng Công Nghệ X Ra Mắt Điện Thoại Mới Với Công Nghệ AI Tích Hợp"
                            summary="Hãng công nghệ X vừa chính thức giới thiệu mẫu điện thoại mới nhất..."
                            onClick={() => goToNewsDetailPage()}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
