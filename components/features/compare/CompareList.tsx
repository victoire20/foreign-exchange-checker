"use client"

import {FaStar} from "react-icons/fa";
import {CiStar} from "react-icons/ci";
import {CurrencyFlag} from "@/components/ui/currency-flag";
import CompareItemPair from "@/components/features/compare/CompareItem";

type Currency = {
    flag: string;
    codeIso: string;
    name: string;
    value: string;
    indice: string;
    isFavorite: boolean;
}

interface Props {
    base: string;
    baseValue: string;
    data: Array<Currency>;
    onToggleFavorite: (quote: string) => void;
}

const CompareList = ({ baseValue, base, data, onToggleFavorite }: Props) => {

    return <div className="bg-[#171719] border border-[#202022] p-4 md:p-5 rounded-2xl">
        {data.length > 0 ? (
            <>
                <div className="uppercase mb-4 md:mb-5 md:flex md:justify-between md:items-center">
                    <div className="mb-2.75 md:mb-0">
                        <span className="text-[14px] leading-[120%] tracking-[1px] text-[#9D9D9D]">multi-currency</span>
                        &nbsp;
                        <span className="text-[16px] leading-[120%] tracking-[1px]">{baseValue ? baseValue : '0,00'} from {base}</span>
                    </div>
                    <p className="text-white opacity-70 text-[12px] leading-[120%] tracking-[0.5px]">
                        {data.length > 1 ? `${data.length} pairs` : `${data.length} pair`}
                    </p>
                </div>
                <div className="flex flex-col items-center gap-3">
                    {data.map((item, index) => (
                        <CompareItemPair key={index} item={item} onToggleFavorite={onToggleFavorite} />
                    ))}
                </div>
            </>
        ) : (
            <div className="text-center py-5 px-20 md:py-10 md:px-45 lg:px-60">
                <h2 className="text-[#C6C6C6] text-[20px] leading-[120%] tracking-[-0.5px] mb-4">No comparison available</h2>
                <p className="text-[#9D9D9D] text-[14px] leading-[120%] tracking-[1px]">
                    Enter an amount in Send above to see what your money is worth in other currencies.
                </p>
            </div>
        )}
    </div>
}

export default CompareList