"use client";

import Image from "next/image";
import {FaCaretDown, FaCaretUp, FaCheck, FaStar} from "react-icons/fa";
import { useState } from "react";
import {FaMagnifyingGlass} from "react-icons/fa6";
import {ComboBox} from "@/components/ui/combobox";
import {CurrencySelector} from "@/components/features/convert-wrapper/currency-selector/currency-selector";


export const ConvertWrapper = () => {
    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isOpenT, setIsOpenT] = useState<boolean>(false);

    return <>
        <h1
            className="text-[20px] font-bold leading-[120%] tracking-[-0.5px] uppercase pb-4 md:text-[20px]
            md:leading-[140%] md:tracking-[-0.5%]">
            Check the rate
        </h1>
        <div className="bg-[#171719] rounded-[20px]">
            <div className="p-4 flex flex-col gap-4 md:flex-row md:justify-between md:p-5">
                <div className="bg-[#202022] border border-[#2E2E2E] h-27.25 rounded-2xl p-4 flex flex-col justify-between gap-5 md:min-w-[40%]">
                    <span className="uppercase text-[#C6C6C6] text-[14px] leading-[120%] tracking-[1px]">send</span>
                    <div className="relative flex justify-between items-center">
                        <a href="#" className="text-[#FFF] text-[32px] leading-[100%] tracking-[-0.5px] hover:underline md:cursor-text">
                            1,000
                        </a>
                        <div>
                            <div className="bg-[#2E2E2E] border border-[#3D3D3D] p-2.5 rounded-lg md:cursor-pointer flex
                            items-center justify-between gap-2 hover:bg-[#3D3D3D] hover:border-[#3D3D3D]"
                                onClick={() => {
                                    setIsOpenT(!isOpenT)
                                }}
                            >
                                <Image className="rounded-[50%]" src={`/images/flags/us.webp`} alt={`flag`} width={20} height={20} />
                                <span className="uppercase">usd</span>
                                {isOpenT ? (<FaCaretUp className={"text-[22px]"} />) : (<FaCaretDown className="text-[22px]" />)}
                            </div>
                            <CurrencySelector isOpen={isOpenT} />
                        </div>
                    </div>
                </div>
                <button
                    className="bg-[#202022] border border-[#2E2E2E] rounded-2xl max-w-max mx-auto px-3.75 py-4
                    hover:bg-[#3D3D3D] hover:border-[#3D3D3D] md:cursor-pointer md:my-auto">
                    <Image src={'/images/icon-exchange-vertical.svg'} alt={`exchange`} width={20} height={20} />
                </button>
                <div className="bg-[#202022] border border-[#2E2E2E] h-27.25 rounded-2xl p-4 flex flex-col justify-between gap-5 md:min-w-[40%]">
                    <span className="uppercase text-[#C6C6C6] text-[14px] leading-[120%] tracking-[1px]">receive</span>

                    <div className="relative flex justify-between items-center">
                        <a href="#" className="text-[#CEF739] text-[32px] leading-[100%] tracking-[-0.5px] hover:underline md:cursor-text">1,000</a>
                        <div>
                            <div
                                className="bg-[#2E2E2E] border border-[#3D3D3D] p-2.5 rounded-lg md:cursor-pointer flex
                                items-center justify-between gap-2 hover:bg-[#3D3D3D] hover:border-[#3D3D3D]"
                                onClick={() => {
                                    setIsOpen(!isOpen)
                                }}
                            >
                                <Image className="rounded-[50%]" src={`/images/flags/eu.webp`} alt={`flag`} width={20} height={20} />
                                <span className="uppercase">eur</span>
                                {isOpen ? (<FaCaretUp className={"text-[22px]"} />) : (<FaCaretDown className="text-[22px]" />)}
                            </div>
                            <ComboBox className="" isOpen={isOpen} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="border-t border-[#2E2E2E] p-4 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-[#FFF] text-[10px] leading-[100%] tracking-normal md:text-[12px] md:leading-[120%] md:tracking-[0.5px]">
                    1 <span className="uppercase">usd</span> = 0.8530 <span className="uppercase">eur</span>
                </p>
                <div className="flex justify-between items-center gap-2">
                    <button
                        onClick={() => setIsFavorite(false)}
                        className={`${isFavorite ? (
                            "btn flex justify-center items-center gap-[9.73px] p-3 bg-[#202022] border border-[#2E2E2E] " +
                            "rounded-lg text-[12px] leading-[130%] tracking-[0.5px] md:cursor-pointer hover:bg-[#2E2E2E] " +
                            "hover:border-[#3D3D3D]"
                        ) : (
                            "btn flex justify-center items-center gap-[9.73px] p-3 bg-[#CEF739] border " +
                            "border-[#CEF739] text-[#0A0A0A] font-bold rounded-lg text-[12px] leading-[130%] tracking-[0.5px] md:cursor-pointer " +
                            "hover:bg-[#CEF739] hover:border-[#CEF739] hover:opacity-80"
                        )}`}>
                        {isFavorite ? (
                            <Image src={'/images/icon-star.svg'} alt={`icon star`} width={12.53} height={12} />
                        ) : (
                            <FaStar className="w-[12.53px] h-3" />
                        )}
                        <span className="uppercase">favorite</span>
                    </button>
                    <button
                        className="btn uppercase px-3 py-3 rounded-lg border border-[#CEF739] hover:bg-[#283300] hover:border-[#CEF739]
                        text-[12px] leading-[130%] tracking-[0.5px] md:cursor-pointer">
                        log conversion
                    </button>
                </div>
            </div>
        </div>
    </>
}