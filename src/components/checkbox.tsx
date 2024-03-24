import cn from "@/utils/clsx"
import * as React from "react"


export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string
}

const Checkbox = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, ...props }, ref) => {
        return (
            <div className="flex items-center">
                <input type="checkbox" className={cn(
                    "peer h-6 w-6 shrink-0 rounded-sm border accent-slate-950 border-zinc-900 shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-zinc-900 data-[state=checked]:text-zinc-50 ", className
                )} {...props} ref={ref} />
                <label htmlFor="hs-checked-checkbox" className="text-sm  ms-2">{label}</label>
            </div>
        )
    }
)
Checkbox.displayName = "Checkbox"

export default Checkbox
