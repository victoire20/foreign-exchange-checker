"use client"

import {FaStar} from "react-icons/fa";
import {CiStar} from "react-icons/ci";
import {CldImage} from "next-cloudinary";

type Currency = {
    flag: string;
    codeIso: string;
    name: string;
    value: string;
    indice: string;
    isFavorite: boolean;
}

interface Props {
    currenciesIsLoading: boolean;
    base: string;
    baseValue: string;
    data: Array<Currency>;
}

const CompareList = ({ baseValue, currenciesIsLoading, base, data }: Props) => {

    return <div className="bg-[#171719] border border-[#202022] p-[16px] md:p-[20px] rounded-[16px]">
        {data.length > 0 ? (
            <>
                <div className="uppercase mb-[16px] md:mb-[20px] md:flex md:justify-between md:items-center">
                    <div className="mb-[11px] md:mb-[0px]">
                        <span className="text-[14px] leading-[120%] tracking-[1px] text-[#9D9D9D]">multi-currency</span>
                        &nbsp;
                        <span className="text-[16px] leading-[120%] tracking-[1px]">{baseValue ? baseValue : '0,00'} from {base}</span>
                    </div>
                    <p className="text-[#FFF] opacity-70 text-[12px] leading-[120%] tracking-[0.5px]">
                        {data.length > 1 ? `${data.length} pairs` : `${data.length} pair`}
                    </p>
                </div>
                <div className="flex flex-col items-center gap-[12px]">
                    {data.filter(curr => !['ang', 'xpt', 'xpf', 'xpd', 'xcg', 'xdr', 'xcd'].includes(curr.codeIso.toLowerCase()))
                        .map((item, index) => (
                        <div
                            key={index}
                            className="p-[12px] min-w-full bg-[#202022] border border-[#2E2E2E] hover:border-[#454547] rounded-[10px] flex
                                justify-between items-center md:cursor-pointer">
                            <div className="flex gap-[10px] items-center">
                                <div>
                                    <CldImage
                                        className="rounded-[50%]"
                                        src={`${item.flag}`}
                                        alt={`flag ${item?.codeIso}`}
                                        width={24}
                                        height={24}
                                        loading="lazy"
                                        crop={{
                                            type: 'auto',
                                            source: true
                                        }}
                                    />
                                </div>
                                <div className="flex flex-col gap-[6px] justify-between">
                                    <span className="uppercase text-[14px] leading-[120%] tracking-[1px]">{item.codeIso}</span>
                                    <span className="capitalize text-[#9D9D9D] text-[12px] leading-[120%] tracking-[0.5px]">{item.name}</span>
                                </div>
                            </div>
                            <div className="flex gap-[10px] items-center">
                                <div className="flex flex-col gap-[6px] justify-between text-right">
                                    <span className="text-[16px] leading-[120%] tracking-[1px]">{item.value}</span>
                                    <span className="text-[#9D9D9D] text-[10px] leading-[100%] tracking-[0px]">@ {item.indice}</span>
                                </div>
                                <div className={`p-[8px] bg-[#202022] border border-[#2E2E2E] rounded-[8px] ${item.isFavorite && 'border-[#CEF739]'}`}>
                                    {item.isFavorite ? (
                                        <FaStar className="text-[#CEF739]" />
                                    ) : (
                                        <CiStar />
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </>
        ) : (
            <div className="text-center py-[20px] px-[80px] md:py-[40px] md:px-[180px] lg:px-[240px]">
                <h2 className="text-[#C6C6C6] text-[20px] leading-[120%] tracking-[-0.5px] mb-[16px]">No comparison available</h2>
                <p className="text-[#9D9D9D] text-[14px] leading-[120%] tracking-[1px]">
                    Enter an amount in Send above to see what your money is worth in other currencies.
                </p>
            </div>
        )}
    </div>
}

export default CompareList