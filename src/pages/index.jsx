import { useEffect, useState } from "react";
import AppHeader from "@/components/Header/Header";
import CallToActionCard from "@/components/Card/CallToActionCard";
import PostCard from "@/components/Card/PostCard";
import useAppNavigation from "@/hooks/useNavigation";
import images from "@/assets/images";
import getNews from "@/services/News";

function HomePage() {
  const {
    goToRegis,
    goToNewsPost,
  } = useAppNavigation();

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const news = await getNews();
      if (news) setData(news);
      setLoading(false);
    }
    fetchData();
  }, []);



  return (
    <div className="min-h-screen pb-[60px] bg-gradient-to-b from-[#1E1A85] to-[#3498db] space-y-4">

      <div className="px-4 pt-6 flex flex-col justify-between space-y-4">
        <CallToActionCard
          logo={images.logoSecond}
          title="Trở thành thành viên BKASim - Mentoring"
          buttonText="Đăng ký ngay"
          onClick={goToRegis}
        />

        <PostCard
          loading={loading}
          image={data[0]?.avatar}
          title={data[0]?.name}
          onClick={goToNewsPost}
        />
      </div>
    </div>
  );
}

export default HomePage;
