function PostCard({ image, title, onClick, loading }) {
    if (loading) {
        return (
            <div className="bg-gray-200 h-[300px] animate-pulse rounded-lg overflow-hidden">
                <div className="w-full h-[250px] bg-gray-300" />
                <div className="p-2">
                    <div className="h-4 bg-gray-300 rounded w-3/4 mb-1" />
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg h-[300px] shadow overflow-hidden cursor-pointer" onClick={onClick}>
            <img src={image} alt="post" className="w-full h-[250px] object-cover" />
            <div className="p-2 text-sm font-semibold">{title}</div>
        </div>
    );
}
export default PostCard;
