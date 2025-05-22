import { useState } from "react";
import Header from "@/components/Header/Header";
import FormInput from "@/components/Form/FormInput";
import SectionTitle from "@/components/Form/SectionTitle";
import FormFooterButton from "@/components/Footer/FormFooterButton";
import ButtonApp from "../Button/ButtonApp";

export default function ZaloConsentModal({ isOpen, onClose, onConfirm, name, phone }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-end justify-center z-50">
            <div className="bg-white rounded-t-2xl w-full p-5">
                <div className="flex justify-center mb-3">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/vi/thumb/4/42/Zalo_icon.png/600px-Zalo_icon.png"
                        alt="App Logo"
                        className="w-12 h-12 rounded-md"
                    />
                </div>
                <h2 className="text-center font-semibold text-black text-base mb-2">
                    Cho phép MINIAPP nhận các thông tin của bạn
                </h2>
                <p className="text-center text-gray-600 text-sm mb-4">
                    Miniapp cần thông tin tên và sđt Zalo để gửi bạn các thông tin mới nhất. <span className="text-blue-500">Tìm hiểu thêm</span>
                </p>

                <div className="border-t pt-2">
                    <div className="flex items-center space-x-2 mb-2">
                        <div className="w-10 h-10 rounded-full bg-gray-200" />
                        <div>
                            <p className="font-medium text-black text-sm">{name}</p>
                            <p className="text-xs text-gray-500">Tên, ảnh đại diện Zalo</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2 mb-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5 text-black"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.25 6.75c0-1.243 1.007-2.25 2.25-2.25h15a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-15A2.25 2.25 0 012.25 17.25V6.75z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6.75 9h.008v.008H6.75V9zM6.75 12h.008v.008H6.75V12zM6.75 15h.008v.008H6.75V15z"
                            />
                        </svg>
                        <p className="text-sm text-black">Số điện thoại liên kết với Zalo</p>
                    </div>
                </div>

                <p className="text-xs text-gray-500 text-center mb-4">
                    Bằng cách nhấn "Cho phép", tôi đồng ý với <span className="text-blue-500">điều khoản sử dụng của Zalo</span>
                </p>

                <div className="flex justify-between space-x-2">
                    <ButtonApp size="md" variant="white" title="Từ chối" />
                    <ButtonApp size="md" title="Cho phép" />
                </div>
            </div>
        </div>
    );
}
