

import classNames from "classnames";
import { base, variantClasses } from "../Container/container.config";





function Container({
    bg = "primary",
    children,
    className = ''
}) {

    const classes = classNames(
        base,
        variantClasses[bg]
    );

    return (
        <div
            className={`${classes} ${className}`}
        >
            {children}
        </div>
    )
}

export default Container;