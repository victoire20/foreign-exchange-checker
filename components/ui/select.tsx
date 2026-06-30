import {FaAngleDown, FaAngleUp} from "react-icons/fa"
import {Badge} from "@/components/ui/badge"
import {useState} from "react"


export type SelectOption = {
    label: string;
    value: string;
    badge?: number;
}

type SelectProps = {
    options: SelectOption[];
    value: string;
    onChange: (value: string) => void;
    className?: string;
}

export const Select = ({
   options,
   value,
   onChange,
   className = ""
}: SelectProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const selectedOption = options.find(
        option => option.value === value
    )

    return <div className={`relative flex justify-between items-center rounded-lg p-3 bg-[#171719] border border-[#3D3D3D] ${className}`}>
        <div
            className="flex justify-between items-center w-full text-[16px] leading-[120%] tracking-[1px] uppercase"
            onClick={() => setIsOpen(!isOpen)}
        >
            <span>{selectedOption?.label}</span>
            {isOpen ? (<FaAngleUp />): (<FaAngleDown />)}
        </div>
        {isOpen && (
            <div
                className={`absolute top-12 bg-[#171719] flex flex-col text-[16px] leading-[120%] tracking-[1px]
                    uppercase border border-[#202022] p-2 rounded-[10px] z-10 w-full right-[0.3px] 
                    transition-all duration-300 ease-out 
                    ${isOpen
                    ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                }`}
            >
                {options.map(option => (
                    <a
                        key={option.value}
                        role="button"
                        className={`px-2 py-[10.5px] ${(option.badge || option.badge !== 0) && 'flex justify-between'}`}
                        onClick={() => {
                            onChange(option.value);
                            setIsOpen(false);
                        }}
                    >
                        {option.label} {option.badge && <Badge value={option.badge} />}
                    </a>
                ))}
            </div>
        )}
    </div>
}