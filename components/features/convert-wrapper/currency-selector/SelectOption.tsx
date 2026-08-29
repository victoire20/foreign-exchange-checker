import Image from "next/image";
import {FaCheck} from "react-icons/fa";

type ItemOptions = {
    className?: string;
    flag?: string;
    iso_code: string;
    label: string;
    isChecked?: boolean;
    onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

export const SelectOption = ({
    className,
    flag,
    iso_code,
    label,
    isChecked = false,
    onClick,
}: ItemOptions) => {
    return <a
        role="button"
        className={`flex justify-between items-center py-3 px-2 hover:bg-[#2E2E2E] rounded-md md:cursor-pointer ${className}`}
        data-value={iso_code}
        onClick={(e) => onClick && onClick(e)}
    >
        <div className="flex items-center gap-3">
            <Image
                className="rounded-full object-cover"
                src={flag as string}
                alt={`flag ${iso_code}`}
                width={20}
                height={20}
            />
            <span className="uppercase text-white text-[14px] leading-[120%] tracking-[1px]">{iso_code}</span>
            <span className="text-[#9D9D9D] text-[12px] leading-[120%] tracking-[0.5px]">{label}</span>
        </div>
        {isChecked && (<FaCheck />)}
    </a>
}