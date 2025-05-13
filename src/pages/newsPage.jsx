import { Page, Header, Input, Text } from "zmp-ui";
import { useNavigate } from "zmp-ui";

const newsList = Array.from({ length: 5 }, (_, i) => ({
    id: i,
    title: "Hãng Công Nghệ X Ra Mắt Điện Thoại Mới Với Công Nghệ AI Tích Hợp",
    description: "Hãng công nghệ X vừa chính thức giới thiệu mẫu điện thoại thông minh mới với chip xử lý AI mạnh mẽ...",
    date: "05/02/2024",
    image: "https://cdn.tgdd.vn/Products/Images/42/305659/s16/iphone-15-pro-max-blue-thumbtz-650x650.png",
}));

function NewsPage() {
    const navigate = useNavigate();

    const handleClick = (id) => {
        navigate("/news-detail"); // có thể truyền ID nếu cần: `/news-detail/${id}`
    };

    return (
        <Page className="bg-white min-h-screen">
            <Header title="TIN TỨC" backLink={true} className="text-white bg-gradient-to-r from-blue-700 to-blue-500" />

            <div className="p-4">
                <Input placeholder="Tìm kiếm nhanh" className="mb-4" />

                {newsList.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => handleClick(item.id)}
                        className="flex gap-3 mb-4 cursor-pointer bg-white rounded-lg shadow-sm p-2"
                    >
                        <img
                            src={item.image}
                            alt="news-thumb"
                            className="w-[90px] h-[90px] object-cover rounded-md"
                        />
                        <div className="flex flex-col justify-between">
                            <Text size="small" className="text-gray-500">{item.date}</Text>
                            <Text className="font-semibold text-black line-clamp-2">{item.title}</Text>
                            <Text size="small" className="text-gray-600 line-clamp-2">{item.description}</Text>
                        </div>
                    </div>
                ))}
            </div>
        </Page>
    );
}

export default NewsPage;
