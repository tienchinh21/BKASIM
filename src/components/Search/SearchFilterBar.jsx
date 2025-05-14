export default function SearchFilterBar({ onSearch, onFilterChange }) {
    return (
        <div className="px-4 py-2 bg-white flex flex-col gap-2">
            <input
                type="text"
                placeholder="Tìm kiếm"
                className="border px-3 py-2 rounded-md text-sm"
                onChange={(e) => onSearch(e.target.value)}
            />
            <select
                className="border px-3 py-2 rounded-md text-sm"
                onChange={(e) => onFilterChange(e.target.value)}
            >
                <option value="all">Tất cả</option>
                <option value="mentor">Mentor</option>
                <option value="mentee">Mentee</option>
            </select>
        </div>
    );
}
