import { memo } from "react";
import classNames from 'classnames';

function ButtonApp({
    children,
    title = "",
    variant = "primary",
    size = "md",
    disabled = false,
    loading = false,
    gradient = false,
    fullWidth = false,
    rounded = false,
    icon = null,
    onClick = () => { }
}) {
    const base = 'inline-flex items-center justify-center font-medium transition focus:outline-none';

    const sizeClasses = {
        sm: 'text-sm px-3 py-1.5',
        md: 'text-base px-4 py-2',
        lg: 'text-lg px-6 py-3',
    };

    const variantClasses = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700',
        secondary: 'bg-gray-100 text-black hover:bg-gray-200',
        outline: 'border border-blue-500 text-blue-500 bg-white hover:bg-blue-50',
        ghost: 'text-blue-500 hover:bg-blue-50',
        icon: 'p-2 rounded-full bg-blue-500 text-white',
        confirm: 'bg-white text-[#1E1A85] font-semibold shadow-md',
    };

    const gradientClass = 'bg-gradient-to-b from-[#1E1A85] to-[#3498db] text-white font-semibold hover:opacity-90';


    const classes = classNames(
        base,
        sizeClasses[size],
        gradient ? gradientClass : variantClasses[variant],
        {
            'w-full': fullWidth,
            'rounded-full': rounded,
            'rounded-md': !rounded && variant !== 'icon',
            'opacity-50 cursor-not-allowed': disabled || loading,
        }
    );

    return (
        <button
            className={classes}
            onClick={onClick}
            disabled={disabled || loading}
        >
            {loading ? (
                <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Đang xử lý...
                </span>
            ) : (
                <>
                    {icon && <span className="mr-2">{icon}</span>}
                    {title}
                </>
            )}
        </button>
    );
}

export default memo(ButtonApp);
