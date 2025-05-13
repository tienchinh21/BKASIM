import { getSystemInfo } from "zmp-sdk";
import {
  AnimationRoutes,
  App,
  Route,
  SnackbarProvider,
  ZMPRouter,
} from "zmp-ui";
import { AppProps } from "zmp-ui/app";


import HomePage from "@/pages/index";
import Noticate from "@/pages/noticate";
import MenteeFormPage from "@/pages/MenteeFormPage";
import NewsPage from "@/pages/newsPage";

import Editprofile from "@/pages/editprofile";
import RoleSelectPage from "@/pages/roleSelection";
import SearchPage from "@/pages/search";
import ProfilePage from "@/pages/profilePage";
import BookingConfirmationPage from "@/pages/bookingComfimPage";
import BookingDetailPage from "@/pages/bookingDetailPage";
import NewsDetailPage from "@/pages/newsDetailpage";
import BottomNav from "./bottomNavigation";

const Layout = () => {
  return (
    <App theme={getSystemInfo().zaloTheme as AppProps["theme"]}>
      <SnackbarProvider>
        <ZMPRouter>
          <AnimationRoutes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/SearchPage" element={<SearchPage />}></Route>
            <Route path="/Noticate" element={<Noticate />}></Route>
            <Route path="/Setting" element={<ProfilePage />}></Route>
            <Route path="/DetailPage" element={<BookingDetailPage />}></Route>
            <Route path="/Setting" element={<ProfilePage />}></Route>
          </AnimationRoutes>
          <BottomNav />
        </ZMPRouter>
      </SnackbarProvider>
    </App>
  );
};
export default Layout;
