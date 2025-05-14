import { useState } from "react";
import AppHeader from "@/components/Header/Header";
import CallToActionCard from "@/components/Card/CallToActionCard";
import PostCard from "@/components/Card/PostCard";
import LoginRequireModal from "@/components/Modal/LoginRequireModal";
import useAppNavigation from "@/hooks/useNavigation";
import images from "@/assets/images";

function HomePage() {
  const {
    goToRegis,
    goToNewsPost,
  } = useAppNavigation();


  return (
    <div className="min-h-screen pb-[60px] bg-gradient-to-b from-[#1E1A85] to-[#3498db] space-y-4">
      <AppHeader logo={images.logo} />

      <div className="px-4 flex flex-col justify-between space-y-4">
        <CallToActionCard
          logo={images.logoSecond}
          title="Trở thành thành viên BKASim - Mentoring"
          buttonText="Đăng ký ngay"
          onClick={goToRegis}
        />

        <PostCard
          image={images.post1}
          title="Tiêu đề bài viết"
          onClick={goToNewsPost}
        />
      </div>
    </div>
  );
}

export default HomePage;
