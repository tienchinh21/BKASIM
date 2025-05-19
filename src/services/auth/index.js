
import axios from "axios";
import apiUrl from "@/assets/api";

export async function fetchUsers(role, search) {
    try {
        const res = await axios.get(apiUrl.getUsers, {
            params: {
                role: role === "all" ? undefined : role,
                search: search || undefined,
            },
        });
        return res.data;
    } catch (error) {
        console.error("Lỗi gọi API fetchUsers:", error);
        return [];
    }
}
