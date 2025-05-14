function PostCard({ image, title, onClick }) {
    return (
        <div className="bg-white rounded-lg shadow overflow-hidden cursor-pointer" onClick={onClick}>
            <img src={image} alt="post" className="w-full object-cover" />
            <div className="p-2 text-sm font-semibold">{title}</div>
        </div>
    );
}
export default PostCard;