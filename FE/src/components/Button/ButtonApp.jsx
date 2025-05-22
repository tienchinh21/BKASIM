
import { memo } from "react";
import classNames from "classnames";
import { base, sizeClasses, variantClasses, gradientClass } from "./button.config";

function ButtonApp({
    title = "",
    variant = "primary",
    size = "md",
    disabled = false,
    loading = false,
    gradient = false,
    fullWidth = false,
    rounded = false,
    icon = null,
    onClick = () => { },
    type = "button",
    children,
}) {
    const isDisabled = disabled || loading;

    const classes = classNames(
        base,
        sizeClasses[size],
        gradient ? gradientClass : variantClasses[variant],
        {
            "w-full": fullWidth,
            "rounded-full": rounded,
            "rounded-md": !rounded && variant !== "icon",
            "opacity-50 cursor-not-allowed": isDisabled,
        }
    );

    return (
        <button
            type={type}
            className={classes}
            onClick={onClick}
            disabled={isDisabled}
        >
            {loading ? (
                <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Đang xử lý...
                </span>
            ) : (
                <>
                    {icon && <span className="mr-2">{icon}</span>}
                    {children || title}
                </>
            )}
        </button>
    );
}

export default memo(ButtonApp);
