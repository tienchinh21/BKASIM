import {
    Page, Header, Input, Tabs, Box, Text
} from "zmp-ui";

const newsList = Array.from({ length: 5 }, (_, i) => ({
    id: i,
    title: "Hãng Công Nghệ X Ra Mắt Điện Thoại Mới Với Công Nghệ AI Tích...",
    description: "Hãng công nghệ X vừa chính thức giới thiệu mẫu điện thoại thông minh mới với chip xử lý AI mạnh mẽ...",
    date: "05/02/2024",
    image: "https://cdn.tgdd.vn/Products/Images/42/305659/s16/iphone-15-pro-max-blue-thumbtz-650x650.png",
}));

function NewsPage() {
    const tabList = [
        { key: "all", title: "Tất cả" },
        { key: "cat1", title: "Danh mục 1" },
        { key: "cat2", title: "Danh mục 2" },
        { key: "cat3", title: "Danh mục 3" },
    ];

    return (
        <Page className="bg-white min-h-screen">
            <Header title="TIN TỨC" backLink={true} className="text-white bg-gradient-to-r from-blue-700 to-blue-500" />

            <Tabs
                tabs={tabList}
                activeKey="all"
                onChange={(key) => console.log("Tab selected:", key)}
                className="sticky top-0 z-10 bg-white"
            >
                <div className="px-4 py-2">
                    <Input placeholder="Tìm kiếm nhanh" className="mb-4" />

                    {newsList.map((item) => (
                        <Box key={item.id} className="flex gap-3 mb-4 border-b pb-3">
                            <img
                                src={item.image}
                                alt="news-thumb"
                                className="w-[90px] h-[90px] object-cover rounded-md"
                            />
                            <div className="flex flex-col justify-between">
                                <Text size="small" className="text-gray-500">{item.date}</Text>
                                <Text size="small" className="text-gray-600 line-clamp-2">{item.description}</Text>
                            </div>
                        </Box>
                    ))}
                </div>
            </Tabs>
        </Page>
    );
}

export default NewsPage;
