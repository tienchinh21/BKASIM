import ButtonApp from "@/components/Button/ButtonApp";

export default function FormFooterButton({
    title = "Xác nhận",
    onClick = () => { },
}) {
    return (
        <div className="relative bg-gradient-to-b from-[#1E1A85] to-[#3498db] px-4 py-6 flex items-center justify-between text-white">
            <ButtonApp
                title={title}
                variant="confirm"
                fullWidth
                rounded
                onClick={onClick}
            />
        </div>
    );
}
