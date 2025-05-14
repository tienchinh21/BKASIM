import { Icon } from "zmp-ui"; // hoặc đổi sang react-icons tùy bạn

export default function FormInput({
    label,
    required,
    placeholder,
    type = "text",
    icon = null,
    ...rest
}) {
    return (
        <div className="mb-3">
            {label && (
                <label className="text-white text-sm font-medium mb-1 block">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}

            <div className="flex items-center w-full rounded px-3 py-2 bg-white border border-gray-300">
                {icon && (
                    <Icon icon={icon} className="text-gray-400 text-base mr-2" />
                )}
                <input
                    type={type}
                    className="flex-1 bg-transparent text-sm text-black placeholder-gray-400 focus:outline-none"
                    placeholder={placeholder}
                    autoComplete="off"
                    {...rest}
                />
            </div>
        </div>
    );
}
