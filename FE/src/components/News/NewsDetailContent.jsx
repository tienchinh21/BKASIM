export default function NewsDetailContent({ image, date, author, title, content }) {
    return (
        <div className="px-4 py-4 bg-white">
            <img src={image} alt="news" className="rounded-md mb-3" />
            <div className="text-xs text-gray-500 mb-1">{date} · Bởi {author}</div>
            <h1 className="text-lg font-bold text-black mb-3">{title}</h1>
            <div className="text-sm text-gray-800 whitespace-pre-line">
                {content}
            </div>
        </div>
    );
}
