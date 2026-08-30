import {FaMagnifyingGlass} from "react-icons/fa6";
import {Input} from "@/components/ui/input";
import { SelectOptions } from "@/components/features/convert-wrapper/currency-selector/SelectOptions";
import {ChangeEvent, useRef} from "react";
import Image from "next/image";
import {FaCaretDown, FaCaretUp} from "react-icons/fa";
import {useClickOutside} from "@/components/features/convert-wrapper/useClickOutside";
import {Currency} from "@/components/features/convert-wrapper/currency-selector/types/forex.type";

interface props {
    onClick: () => void;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onChoose?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
    className?: string;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    currencies: Array<Currency>;
    searchKey?: string;
    device?: Currency;
    isLoading: boolean;
}

export const Select = ({
    onClick,
    onChange,
    onChoose,
    className,
    isOpen,
    setIsOpen,
    currencies,
    searchKey,
    device,
    isLoading
}: props) => {
    const dropdownRef = useRef<HTMLDivElement>(null)

    useClickOutside(dropdownRef, () => {
        setIsOpen(false)
    })

    return <>
        <div className="bg-[#2E2E2E] border border-[#3D3D3D] p-2.5 rounded-lg md:cursor-pointer flex items-center
            justify-between gap-2 hover:bg-[#3D3D3D] hover:border-[#3D3D3D] w-max"
             onClick={onClick}
        >
            <Image
                className="rounded-[50%]"
                src={`/images/1x1/${device?.iso_code.slice(0, 2)}.svg`}
                alt={`flag ${device?.name}`}
                width={20}
                height={20}
            />
            <span className="uppercase">{device?.iso_code}</span>
            {isOpen ? (<FaCaretUp className={"text-[22px]"} />) : (<FaCaretDown className="text-[22px]" />)}
        </div>
        {isOpen && (
            <div
                ref={dropdownRef}
                className={`absolute z-10 top-15 bg-[#202022] border border-[#3D3D3D] -left-4 -right-4 rounded-lg p-2 shadow-2xl ${className} 
                transition-all duration-300 ease-out 
                    ${isOpen
                    ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                }\``}>

                <div className="relative flex items-center gap-2.5 h-11.5 border border-[#9D9D9D] rounded-md mb-2.5">
                    <FaMagnifyingGlass className="absolute left-3" />
                    <Input
                        className="pl-9 w-full h-full focus-within:border-none focus-within:outline-none rounded-md"
                        type="text"
                        placeholder="Search currencies ..."
                        onChange={onChange}
                    />
                </div>

                <div className="max-h-64 overflow-y-auto pr-1 custom-scrollbar">
                    <SelectOptions
                        activeCurrency={device?.iso_code}
                        searchKey={!isOpen ? '' : searchKey}
                        currencies={currencies}
                        isLoading={isLoading}
                        onClick={onChoose}
                    />
                </div>
            </div>
        )}
    </>
}