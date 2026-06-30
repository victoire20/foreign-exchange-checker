import Image from "next/image";
import {FaCheck} from "react-icons/fa";

type ItemOptions = {
    className?: string;
    flag?: string;
    isoCode: string;
    label: string;
}

export const CurrencySelectorItem = ({
    className,
    flag,
    isoCode,
    label
}: ItemOptions) => {
    return <a href="#" className={`flex justify-between items-center py-3 px-2 hover:bg-[#2E2E2E] rounded-md md:cursor-pointer ${className}`}>
        <div className="flex items-center gap-3">
            {flag && (
                <Image
                    src={flag}
                    alt={`flag ${isoCode}`}
                    width={20}
                    height={20}
                />
            )}
            <span className="uppercase text-white text-[14px] leading-[120%] tracking-[1px]">{isoCode}</span>
            <span className="text-[#9D9D9D] text-[12px] leading-[120%] tracking-[0.5px]">{label}</span>
        </div>
        <FaCheck />
    </a>
}