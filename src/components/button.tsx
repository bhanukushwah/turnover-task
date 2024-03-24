import cn from "@/utils/clsx";
import * as React from "react";


export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, ...props }, ref) => {
        return (
            <button
                className={cn("inline-flex items-center justify-center rounded-md text-normal font-medium bg-black text-white p-4 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-400 disabled:pointer-events-none disabled:opacity-50", className)}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export default Button;
