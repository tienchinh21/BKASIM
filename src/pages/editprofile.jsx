import { Page, Header, Input, Title, Box, Avatar } from "zmp-ui";

function EditProfilePage() {
  return (
    <Page className="bg-gradient-to-b from-blue-700 to-blue-500" style={{ padding: 16 }}>

      <Header title="THÔNG TIN CÁ NHÂN" backLink={true} className="text-white" />

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
        <div style={{
          borderRadius: '50%',
          padding: 4,
          background: 'linear-gradient(to bottom right, #ffb347, #1e90ff)',
        }}>
          <Avatar
            size={96}
            // src="https://randomuser.me/api/portraits/women/44.jpg" // bạn thay bằng ảnh thật
            alt="avatar"
          />
        </div>
      </div>

      {/* Thông tin cá nhân */}
      <Box className="mt-4 bg-white rounded-xl p-4">
        {/* <Title size="small">Thông tin cá nhân</Title> */}
        <Input label="Họ và tên" value="Nguyễn Thị B" readOnly />
        <Input label="Email" value="nguyenthib@gmail.com" readOnly />
        <Input label="Ngày sinh" value="01/07/2000" readOnly />
        <Input label="MBTI/DISC" value="ASRM" readOnly />
      </Box>

      {/* Thông tin thêm */}
      <Box className="mt-4 bg-white rounded-xl p-4">
        <Title size="small">Thông tin thêm</Title>
        <Input label="Tên công ty/trường" value="Công ty Cổ phần ABC" readOnly />
        <Input label="Chức vụ" value="Nhân viên" readOnly />
        <Input label="Kinh nghiệm" value="5 Năm kinh nghiệm" readOnly />
      </Box>

    </Page>
  );
}

export default EditProfilePage;
