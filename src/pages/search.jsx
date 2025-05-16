import AppHeader from "@/components/Header/Header"
import SearchFilterBar from "@/components/Search/SearchFilterBar";
import UserCard from "@/components/Card/UserCard";
import { useState } from "react";

export default function SearchPage() {
    const [activeTab, setActiveTab] = useState("mentor");

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#1E1A85] to-[#3498db] pb-16">

            <SearchFilterBar
                onSearch={(val) => console.log("Search:", val)}
                onFilterChange={(val) => setActiveTab(val)}
            />

            <div className="flex justify-around mt-2 text-sm font-semibold text-white">
                <button onClick={() => setActiveTab("mentor")} className={activeTab === "mentor" ? "underline" : ""}>Danh sách Mentor</button>
                <button onClick={() => setActiveTab("mentee")} className={activeTab === "mentee" ? "underline" : ""}>Danh sách Mentee</button>
            </div>

            <div className="bg-white mt-2 mx-4 rounded-lg overflow-hidden">
                {[...Array(6)].map((_, idx) => (
                    <UserCard
                        key={idx}
                        avatar="/avatar.png"
                        name="Nguyễn Văn A"
                        profession="Nghề nghiệp"
                        onFavorite={() => console.log("Yêu thích", idx)}
                    />
                ))}
            </div>
        </div>
    );
}
