import {FaCheck} from "react-icons/fa";
import { CldImage } from "next-cloudinary";

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
            <CldImage
                className="rounded-full object-cover"
                src={`https://res.cloudinary.com/ckiepogy/image/upload/v1788561262/${flag}`}
                alt={`flag ${iso_code}`}
                width={20}
                height={20}
                loading="lazy"
                crop={{
                    type: 'auto',
                    source: true
                }}
            />
            <span className="uppercase text-white text-[14px] leading-[120%] tracking-[1px]">{iso_code}</span>
            <span className="text-[#9D9D9D] text-[12px] leading-[120%] tracking-[0.5px]">{label}</span>
        </div>
        {isChecked && (<FaCheck />)}
    </a>
}