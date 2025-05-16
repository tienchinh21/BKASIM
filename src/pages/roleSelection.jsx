import AppHeader from "@/components/Header/Header"
import RoleCard from "@/components/Card/RoleCard";
import useAppNavigation from "@/hooks/useNavigation";
import images from "@/assets/images";
import Container from "@/components/Container/Container";

export default function SelectRolePage() {
    const { goBack, goToMentee, goToMentor } = useAppNavigation();

    return (
        <Container >

            <div className="text-white font-semibold text-lg text-center mt-6 mb-4">
                Bạn muốn trở thành<br />Mentee hay Mentor?
            </div>

            <RoleCard
                onClick={goToMentee}
                title="Mentee"
                description="Cựu sinh viên, Sinh viên có khát vọng phát triển bản thân, xây dựng sự nghiệp, tạo giá trị cho cộng đồng"
                image={images.mentee}
            />

            <RoleCard
                onClick={goToMentor}
                title="Mentor"
                description="Anh/chị cựu sinh viên có kinh nghiệm và quản trị, điều hành doanh nghiệp"
                image={images.mentor}
            />

            <div className="flex justify-center mt-4">
                <button onClick={goBack} className="bg-white text-blue-600 rounded-full p-3 shadow">
                    ⬅️ Quay lại
                </button>
            </div>

        </Container>

    );
}
