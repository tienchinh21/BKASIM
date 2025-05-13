import { Page, Header, Box, useNavigate } from "zmp-ui";
import imageMentee from "../static/1.png";
import imageMentor from "../static/2.png";

function RoleSelectPage() {
    const navigate = useNavigate()
    const handleMenteeClick = () => {
        navigate('/mentee')
    }
    const handleMentorClick = () => {
        navigate('/mentor')
    }
    return (
        <Page
            style={{
                background: 'linear-gradient(135deg,#262C6E,#3993D9 )',
                padding: 16
            }}>

            <Header
                title="ĐĂNG KÝ"
                backLink={true}
                className="text-black"
                style={{ background: 'linear-gradient(135deg, #3993D9, #262C6E )' }} />

            <div style={{ textAlign: 'center', color: 'white', marginTop: 16 }}>
                <h5 style={{ color: 'white' }}>Bạn muốn trở thành mentee hay mentor?</h5>
            </div>



            <Box
                onClick={handleMenteeClick}
                className="mt-20 bg-blue-100 rounded-xl p-4"
                style={
                    {
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        backgroundColor: '#3993D9'
                    }}
            >
                <img
                    src={imageMentee}
                    alt="mentee"
                    style={{ width: '80%', maxWidth: 200, marginBottom: 12 }}
                />
                <h3
                    style={{
                        color: 'white',
                        fontSize: 24,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        marginBottom: 8
                    }} >Mentee</h3>
                <span
                    style={{
                        color: 'white',
                        fontSize: 12,
                        fontWeight: '500',
                        textAlign: 'center',
                        marginBottom: 8
                    }}>
                    Cựu sinh viên, sinh viên có khao khát phát triển bản thân, khởi nghiệp hoặc gia nhập thị trường lao động.
                </span>
            </Box>

            <Box
                onClick={handleMentorClick}
                className="mt-4 bg-blue-100 rounded-xl p-4"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    backgroundColor: '#3993D9'
                }}
            >
                <img
                    src={imageMentor} // ảnh minh họa Mentor
                    alt="mentor"
                    style={{ width: '80%', maxWidth: 200, marginBottom: 12 }}
                />
                <h3
                    style={{
                        color: 'white',
                        fontSize: 24,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        marginBottom: 8
                    }} >Mentee</h3>
                <span
                    style={{
                        color: 'white',
                        fontSize: 12,
                        fontWeight: '500',
                        textAlign: 'center',
                        marginBottom: 8
                    }}>
                    Anh/chị cựu sinh viên có kinh nghiệm về quản trị & điều hành doanh nghiệp
                </span>

            </Box>

            <div style={{ textAlign: 'center', marginTop: 24 }}>
                <span> Trở về</span>
            </div>
        </Page>
    );
}

export default RoleSelectPage;
