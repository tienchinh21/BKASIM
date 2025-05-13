import {
    Page, Header, Box, Text, Button, Avatar, Icon
} from "zmp-ui";

function ProfilePage() {
    return (
        <Page
            style={{ background: 'linear-gradient(135deg,#262C6E, #3993D9)' }}
            className="bg-gradient-to-b from-blue-700 to-blue-500 min-h-screen">
            <Header
                title="Cá nhân"
                centerTitle
                backLink={true}
                className="text-white"
                style={{ background: 'linear-gradient(135deg,#262C6E, #3993D9)' }} />

            <div

                className="mt-20 px-4 py-3 flex flex-col gap-4">

                <Box className="flex items-center justify-between bg-white rounded-xl p-3">
                    <div className="flex items-center gap-3">
                        <Avatar
                            size={40}
                            src="https://randomuser.me/api/portraits/men/45.jpg"
                        />
                        <Text className="font-medium">Mentor Nguyễn Văn A</Text>
                    </div>
                    <Icon icon="zi-edit" className="text-gray-500" />
                </Box>

                <Box className="flex items-center justify-between bg-white rounded-xl p-3">
                    <div>
                        <Text className="font-medium">Trắc nghiệm tính cách</Text>
                        <Text size="small">Test MBTI/DISC</Text>
                    </div>
                    <Button size="small" variant="primary">
                        Thực hiện bài test
                    </Button>
                </Box>
            </div>
        </Page>
    );
}

export default ProfilePage;
