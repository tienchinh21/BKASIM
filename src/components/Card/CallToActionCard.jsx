import ButtonApp from "../Button/ButtonApp";

function CallToActionCard({ logo, title, buttonText, onClick }) {
    return (
        <div className="bg-white rounded-lg p-3 mb-4 flex items-center justify-between shadow">
            <div className="flex items-center gap-3">
                <img src={logo} alt="logo" className="h-10 w-10 rounded" />
                <div className="text-sm font-medium">{title}</div>
            </div>
            <ButtonApp onClick={onClick} size="sm" gradient title={buttonText} />
        </div>
    );
}
export default CallToActionCard;