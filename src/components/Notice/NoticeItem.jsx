import ButtonApp from "../Button/ButtonApp";

export default function NotificationItem({ message, time, buttonText, onClick }) {
    return (
        <div className="bg-white rounded-md px-4 py-3 shadow mb-3">
            <div className="text-sm text-black font-medium mb-1 flex justify-between items-center">
                <span>{message}</span>
                {buttonText && (
                    <ButtonApp
                        size="sm"
                        variant=""
                        title={buttonText} />
                )}
            </div>
            <div className="text-xs text-gray-500">{time}</div>
        </div>
    );
}