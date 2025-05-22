export default function RoleCard({ title, description, image, onClick }) {
    return (
        <div
            onClick={onClick}
            className="bg-[#3993D9] rounded-xl shadow p-4 mb-4 flex flex-col items-center text-center cursor-pointer transition hover:shadow-md"
        >
            <img src={image} alt={title} className="h-28 object-contain mb-2" />
            <div className="font-semibold text-white  text-base mb-1">{title}</div>
            <p className="text-sm text-white text-gray-600">{description}</p>
        </div>
    );
}
