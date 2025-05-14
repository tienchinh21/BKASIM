
import { useNavigate } from "zmp-ui";

export default function useAppNavigation() {
    const navigate = useNavigate();

    return {
        goToRegister: () => navigate("/register"),
        goToDetail: () => navigate("/detail"),
        goBack: () => navigate(-1),
        goToRegis: () => navigate("/Regis"),
        goToNewsPost: () => navigate("/newsPost"),
        goToNewsDetailPage: () => navigate("/news-detail"),
        goToMentee: () => navigate("/mentee"),
        goToMentor: () => navigate("/mentor"),
        goToConfirm: () => navigate("/booking-confirm"),
        goToDetailBooking: () => navigate("/booking-detail"),
        goToEditProfile: () => navigate("/editprofile"),
    };
}
