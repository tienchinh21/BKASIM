import { Button } from "zmp-ui";
import ButtonApp from "../Button/ButtonApp";

export default function UserCard({ avatar, name, profession, onFavorite }) {
    return (
        <div className="flex items-center justify-between p-3 border-b bg-white">
            <div className="flex items-center gap-3">
                <img src={avatar} alt="avatar" className="w-10 h-10 rounded-full bg-gray-200" />
                <div>
                    <div className="font-medium text-sm">{name}</div>
                    <div className="text-xs text-gray-500">{profession}</div>
                </div>
            </div>
            <ButtonApp size="sm" rounded variant="outline" title="yêu thích"/>
        </div>
    );
}
