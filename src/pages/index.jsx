import { Button, Header, useNavigate } from "zmp-ui";
import logo from "../static/image.png";
import imageCard from "../static/img1.png";

function HomePage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/DetailPage');
  };

  const handleRegis = () => {
    navigate('/Regis');
  };

  return (
    <div className="h-screen flex flex-col items-center gap-4 p-4 text-white bg-[linear-gradient(135deg,#262C6E,#3993D9)]">
      <Header
        title="Home"
        backLink={false}
        className="zmp-header text-white bg-[linear-gradient(135deg,#3993D9,#262C6E)]"
      />

      {/* Thẻ giới thiệu thành viên */}
      <div className="w-[95%] h-[10vh] mt-24 bg-white rounded-lg flex items-center justify-between px-4 text-black">
        <img src={logo} alt="left-icon" className="h-[80%]" />
        <span className="text-sm font-semibold ml-5">
          Trở thành thành viên BKASim - Mentoring
        </span>
        <Button
          className="bg-[linear-gradient(135deg,#262C6E,#3993D9)] max-w-[150px]"
          onClick={handleRegis}
        >
          Đăng kí ngay
        </Button>
      </div>

      {/* Thẻ nội dung bài viết */}
      <div
        onClick={handleClick}
        className="w-[95%] bg-white rounded-lg p-4 cursor-pointer"
      >
        <img
          src={imageCard}
          alt="logo"
          className="w-full h-[200px] object-cover rounded-lg bg-red-500"
        />
        <h2 className="text-black mt-2 text-lg font-semibold">Tiêu đề bài viết</h2>
      </div>
    </div>
  );
}

export default HomePage;
