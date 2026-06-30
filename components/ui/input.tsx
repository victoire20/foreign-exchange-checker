import {InputHTMLAttributes} from "react";


type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    error?: boolean;
}

export const Input = ({
    className = "",
    error = false,
    ...props
}: InputProps) => {
    return (
        <input
            className={`
                w-full
                bg-transparent
                border-none
                outline-none
                ring-0
                text-[12px]
                leading-[120%]
                tracking-[0.5px]
                placeholder:text-[#9D9D9D]
                focus:border-none
                focus:outline-none
                focus:ring-0
                ${error ? "border-red-500" : ""}
                ${className}
            `}
            {...props}
        />
    )
}