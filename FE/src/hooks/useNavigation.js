// useAppNavigation.js
import { useNavigate } from "zmp-ui";
import { ROUTES } from "@/assets/constant/routes";

export default function useAppNavigation() {
    const navigate = useNavigate();

    return {
        goToRegister: () => navigate(ROUTES.REGISTER),
        goToDetail: () => navigate(ROUTES.DETAIL),
        goToRegis: () => navigate(ROUTES.REGIS),
        goToNewsPost: () => navigate(ROUTES.NEWS_POST),
        goToNewsDetailPage: () => navigate(ROUTES.NEWS_DETAIL),
        goToMentee: () => navigate(ROUTES.MENTEE),
        goToMentor: () => navigate(ROUTES.MENTOR),
        goToConfirm: () => navigate(ROUTES.CONFIRM),
        goToDetailBooking: () => navigate(ROUTES.BOOKING_DETAIL),
        goToEditProfile: () => navigate(ROUTES.EDIT_PROFILE),
        goBack: () => navigate(-1),
    };
}
