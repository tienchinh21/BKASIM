import { lazy, Suspense } from "react";
import {
  AnimationRoutes,
  App,
  Route,
  SnackbarProvider,
  ZMPRouter,
} from "zmp-ui";
import { getSystemInfo } from "zmp-sdk";
import { AppProps } from "zmp-ui/app";

import Header from "./Header/Header";
import BottomNav from "./bottomNavigation";
import NotificationPage from "@/pages/noticate";
import HomePage from "@/pages";
import SearchPage from "@/pages/search";
import ProfilePage from "@/pages/profilePage";
import BookingMentoring from "@/pages/BookingMentoring";

const NewsPage = lazy(() => import("@/pages/newsPage"));
const SelectRolePage = lazy(() => import("@/pages/roleSelection"));
const MenteeFormPage = lazy(() => import("@/pages/MenteeFormPage"));
const MentorFormPage = lazy(() => import("@/pages/MentorFormPage"));
const NewsDetailPage = lazy(() => import("@/pages/newsDetailpage"));
const BookingConfirmationPage = lazy(() => import("@/pages/bookingComfimPage"));
const BookingDetailPage = lazy(() => import("@/pages/bookingDetailPage"));
const Regis = lazy(() => import("@/pages/regis"));
const EditProfilePage = lazy(() => import("@/pages/editprofile"));

const Layout = () => {
  return (
    <App theme={getSystemInfo().zaloTheme as AppProps["theme"]}>
      <SnackbarProvider>
        <ZMPRouter>
          <div className="flex flex-col h-screen overflow-hidden">
            {/* Header cố định */}
            <div className="flex-none h-[88px]">
              <Header />
            </div>

            {/* Nội dung chính */}
            <div className="flex-1 overflow-y-auto">
              <Suspense fallback={<div className="text-center p-4">Đang tải...</div>}>
                <AnimationRoutes >
                  <Route path="/" element={<HomePage />} />
                  <Route path="/SearchPage" element={<SearchPage />} />
                  <Route path="/Noticate" element={<NotificationPage />} />
                  <Route path="/Setting" element={<ProfilePage />} />
                  <Route path="/newsPost" element={<NewsPage />} />
                  <Route path="/Regis" element={<SelectRolePage />} />
                  <Route path="/mentee" element={<MenteeFormPage />} />
                  <Route path="/mentor" element={<MentorFormPage />} />
                  <Route path="/news-detail" element={<NewsDetailPage />} />
                  <Route path="/Booking" element={<BookingMentoring />} />
                  <Route path="/booking-detail" element={<BookingDetailPage />} />
                  <Route path="/booking-confirm" element={<BookingConfirmationPage />} />
                  <Route path="/regis" element={<Regis />} />
                  <Route path="/editprofile" element={<EditProfilePage />} />
                </AnimationRoutes>
              </Suspense>
            </div>

            <div >
              <BottomNav />
            </div>
          </div>
        </ZMPRouter>
      </SnackbarProvider>
    </App>
  );
};

export default Layout;
