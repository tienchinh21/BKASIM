import {
    Page, Header, Input, Tabs, Button, Avatar, Icon, Box, Text
} from "zmp-ui";

const dummyUsers = Array.from({ length: 5 }, (_, i) => ({
    id: i,
    name: "Nguyễn Văn A",
    job: "Nghề nghiệp",
}));

function SearchPage() {
    return (
        <Page className="bg-gradient-to-b from-blue-700 to-blue-500 min-h-screen">
            <Header title="TÌM KIẾM" backLink={true} className="text-white" />

            <div className="px-4 py-3">
                <Input
                    placeholder="Tìm kiếm"
                    clearable
                    prefix={<Icon icon="zi-search" />}
                    className="bg-white rounded-lg"
                />

                <select className="w-full mt-3 p-2 rounded-md text-black">
                    <option value="all">Tất cả</option>
                    <option value="it">CNTT</option>
                    <option value="marketing">Marketing</option>
                </select>

                <Tabs defaultActiveKey="mentor" className="mt-4 bg-white rounded-xl">
                    <Tab key="mentor" title="Danh sách Mentor">
                        {dummyUsers.map((user) => (
                            <Box
                                key={user.id}
                                className="flex items-center justify-between border-b p-3"
                            >
                                <div className="flex items-center gap-3">
                                    <Avatar size={40} />
                                    <div>
                                        <Text className="font-medium">{user.name}</Text>
                                        <Text size="small">{user.job}</Text>
                                    </div>
                                </div>
                                <Button
                                    size="small"
                                    variant="secondary"
                                    className="text-primary"
                                >
                                    Yêu thích
                                </Button>
                            </Box>
                        ))}
                    </Tab>

                    <Tab key="mentee" title="Danh sách Mentee">
                        {dummyUsers.map((user) => (
                            <Box
                                key={user.id}
                                className="flex items-center justify-between border-b p-3"
                            >
                                <div className="flex items-center gap-3">
                                    <Avatar size={40} />
                                    <div>
                                        <Text className="font-medium">{user.name}</Text>
                                        <Text size="small">{user.job}</Text>
                                    </div>
                                </div>
                                <Button
                                    size="small"
                                    variant="secondary"
                                    className="text-primary"
                                >
                                    Yêu thích
                                </Button>
                            </Box>
                        ))}
                    </Tab>
                </Tabs>
            </div>
        </Page>
    );
}

export default SearchPage;
