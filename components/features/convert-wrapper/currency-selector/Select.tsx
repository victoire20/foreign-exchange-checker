import {FaMagnifyingGlass} from "react-icons/fa6";
import {Input} from "@/components/ui/input";
import { SelectOptions } from "@/components/features/convert-wrapper/currency-selector/SelectOptions";
import {ChangeEvent, useRef} from "react";
import {FaCaretDown, FaCaretUp} from "react-icons/fa";
import {useClickOutside} from "@/components/features/convert-wrapper/useClickOutside";
import {Currency} from "@/components/features/convert-wrapper/currency-selector/types/forex.type";
import { CldImage } from 'next-cloudinary';

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
    const shimmer = (w: number, h: number) => `
      <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <defs>
          <linearGradient id="g">
            <stop stop-color="#333" offset="20%" />
            <stop stop-color="#222" offset="50%" />
            <stop stop-color="#333" offset="70%" />
          </linearGradient>
        </defs>
        <rect width="${w}" height="${h}" fill="#333" />
        <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
        <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
      </svg>`
    const toBase64 = (str: string) =>
        typeof window === 'undefined'
            ? Buffer.from(str).toString('base64')
            : window.btoa(str)
    const dataUrl = `data:image/svg+xml;base64,${toBase64(shimmer(600, 400))}`
    const dropdownRef = useRef<HTMLDivElement>(null)

    useClickOutside(dropdownRef, () => {
        setIsOpen(false)
    })

    return <>
        <div className="bg-[#2E2E2E] border border-[#3D3D3D] p-2.5 rounded-lg md:cursor-pointer flex items-center
            justify-between gap-2 hover:bg-[#3D3D3D] hover:border-[#3D3D3D] w-max"
             onClick={onClick}
        >
            <CldImage
                className="rounded-[50%]"
                src={`https://res.cloudinary.com/ckiepogy/image/upload/v1788561262/${device?.iso_code?.toLowerCase().slice(0, 2)}.svg`}
                defaultImage={"/images/placeholder.svg"}
                alt={`flag ${device?.iso_code}`}
                width={20}
                height={20}
                placeholder="blur"      // Active le placeholder
                blurDataURL={dataUrl}   // Injecte votre SVG encodé en base64
                loading="lazy"
                crop={{
                    type: 'auto',
                    source: true
                }}
                onError={(err) => {
                    // Si Cloudinary ne trouve pas l'image (404), on bascule sur le placeholder
                    //if (imgSrc !== placeholderFlag) {
                    //    setImgSrc(placeholderFlag);
                    //}
                    console.log('err', err)
                    //setImgSrc('https://placehold.co/600x400')
                }}
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