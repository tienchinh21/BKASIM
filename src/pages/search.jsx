import { useEffect, useState } from "react";
import AppHeader from "@/components/Header/Header";
import SearchFilterBar from "@/components/Search/SearchFilterBar";
import UserCard from "@/components/Card/UserCard";
import Container from "@/components/Container/Container";
import { fetchUsers } from "../services/auth/index"; // <-- tùy lại đường dẫn của bạn

export default function SearchPage() {
    const [activeTab, setActiveTab] = useState("mentor");
    const [searchTerm, setSearchTerm] = useState("");
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true); // Bắt đầu loading
            const data = await fetchUsers(activeTab, searchTerm);
            setUsers(data);
            setLoading(false); // Kết thúc loading
        };

        loadData();
    }, [activeTab, searchTerm]);

    return (
        <Container>
            <SearchFilterBar
                onSearch={(val) => setSearchTerm(val)}
                onFilterChange={(val) => setActiveTab(val)}
            />

            {/* Tabs lọc */}
            <div className="flex justify-around mt-2 text-sm font-semibold text-white">
                <button
                    onClick={() => setActiveTab("mentor")}
                    className={activeTab === "mentor" ? "underline" : ""}
                >
                    Danh sách Mentor
                </button>
                <button
                    onClick={() => setActiveTab("mentee")}
                    className={activeTab === "mentee" ? "underline" : ""}
                >
                    Danh sách Mentee
                </button>
                <button
                    onClick={() => setActiveTab("all")}
                    className={activeTab === "all" ? "underline" : ""}
                >
                    Tất cả
                </button>
            </div>

            {/* Danh sách hoặc loading */}
            {loading ? (
                <div className="flex justify-center py-8">
                    <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : (
                <div className="bg-white mt-2 mx-4 rounded-lg overflow-hidden">
                    {users.length > 0 ? (
                        users.map((user, idx) => (
                            <UserCard
                                key={user.id || idx}
                                avatar={user.avatar || "/avatar.png"}
                                name={user.name}
                                profession={user.profession || "Nghề nghiệp"}
                                onFavorite={() => console.log("Yêu thích", user.id)}
                            />
                        ))
                    ) : (
                        <div className="text-center py-6 text-gray-500">
                            Không tìm thấy người dùng nào.
                        </div>
                    )}
                </div>
            )}
        </Container>
    );
}
