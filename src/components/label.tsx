import cn from "@/utils/clsx"
import * as React from "react"

export type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
    ({ className, ...props }, ref) => {
        return (
            <label
                className={cn(
                    "mb-2 block",
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)
Label.displayName = "Label"

export default Label