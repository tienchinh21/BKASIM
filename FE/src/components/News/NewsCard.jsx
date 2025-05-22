export default function NewsCard({ image, date, title, summary, onClick }) {
    return (
        <div onClick={onClick} className="flex gap-3 p-3 border-b cursor-pointer bg-white hover:bg-gray-50">
            <img src={image} alt="news" className="w-20 h-20 object-cover rounded" />
            <div className="flex-1">
                <div className="text-xs text-gray-500 mb-1">{date}</div>
                <div className="font-semibold text-sm mb-1 line-clamp-2">{title}</div>
                <div className="text-xs text-gray-600 line-clamp-2">{summary}</div>
            </div>
        </div>
    );
}
