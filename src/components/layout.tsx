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
import BottomNav from "./bottomNavigation";
import BookingMentoring from "@/pages/BookingMentoring";
import EditProfilePage from "@/pages/editprofile";
import Header from "./Header/Header";

const HomePage = lazy(() => import("@/pages"));
const SearchPage = lazy(() => import("@/pages/search"));
const NotificationPage = lazy(() => import("@/pages/noticate"));
const ProfilePage = lazy(() => import("@/pages/profilePage"));
const NewsPage = lazy(() => import("@/pages/newsPage"));
const SelectRolePage = lazy(() => import("@/pages/roleSelection"));
const MenteeFormPage = lazy(() => import("@/pages/MenteeFormPage"));
const MentorFormPage = lazy(() => import("@/pages/MentorFormPage"));
const NewsDetailPage = lazy(() => import("@/pages/newsDetailpage"));
const BookingConfirmationPage = lazy(() => import("@/pages/bookingComfimPage"));
const BookingDetailPage = lazy(() => import("@/pages/bookingDetailPage"));
const Regis = lazy(() => import("@/pages/regis"));

const Layout = () => {

  const visiblePaths = ["/", "/SearchPage", "/Noticate", "/Setting"];
  const currentPath = window.history?.state?.path || "/";
  const showBottomNav = visiblePaths.includes(currentPath);

  return (
    <App theme={getSystemInfo().zaloTheme as AppProps["theme"]}>
      <SnackbarProvider>
        <ZMPRouter>
          <Header title="Title" />
          <Suspense fallback={<div className="text-center p-4">Đang tải...</div>}>
            <AnimationRoutes>
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

          <BottomNav />
        </ZMPRouter>
      </SnackbarProvider>
    </App>
  );
};

export default Layout;
