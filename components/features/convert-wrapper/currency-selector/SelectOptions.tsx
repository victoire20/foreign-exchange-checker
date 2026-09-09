import {SelectOption} from "@/components/features/convert-wrapper/currency-selector/SelectOption";
import {Currency} from "@/components/features/convert-wrapper/currency-selector/types/forex.type";
import {useMemo} from "react";


type params = {
    activeCurrency?: string;
    searchKey?: string;
    isLoading: boolean;
    currencies: Array<Currency>;
    onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}


export const SelectOptions = ({
   activeCurrency,
   searchKey,
   currencies,
   isLoading = false,
   onClick
}: params) => {
    const popularCurrencies = useMemo<Currency[]>(() => {
        return currencies.filter(curr => ['usd', 'eur', 'gbp'].includes(curr.iso_code.toLowerCase()))
    }, [currencies])

    const otherCurrencies = useMemo(() =>
        searchKey ? currencies : currencies.filter(c =>
            !['usd', 'eur', 'gbp'].includes(c.iso_code.toLowerCase())), [currencies, searchKey])

    if (isLoading) {
        return <div className="p-2 text-[#9D9D9D] text-[12px] leading-[120%] tracking-[0.5px] text-center">
            Loading data...
        </div>
    }

    return <>
        {!searchKey && (
            <>
                <div className="flex justify-between items-center p-2 text-[#9D9D9D] text-[12px] leading-[120%] tracking-[0.5px]">
                    <span className="uppercase">popular</span>
                    <span>{popularCurrencies.length}</span>
                </div>
                <hr className="border-[#2E2E2E] mb-1"/>
                <div className="mb-1">
                    {popularCurrencies.map((item, index) => (
                        <SelectOption
                            key={index}
                            flag={`${item.iso_code.toLowerCase().slice(0, 2)}.svg`}
                            iso_code={item.iso_code}
                            label={item.name}
                            isChecked={item.iso_code === activeCurrency}
                            onClick={(e) => onClick && onClick(e)}
                        />
                    ))}
                </div>
            </>
        )}
        <div className="flex justify-between items-center p-2 text-[#9D9D9D] text-[12px] leading-[120%] tracking-[0.5px]">
            <span className="uppercase">{!searchKey ? 'other currencies': `Result find for "${searchKey}"`}</span>
            <span>{otherCurrencies.length}</span>
        </div>
        <hr className="border-[#2E2E2E] mb-1"/>
        <div className="mb-1">
            {otherCurrencies.map((item, index) => (
                <SelectOption
                    key={index}
                    flag={`${item.iso_code.slice(0, 2)}.svg`}
                    iso_code={item.iso_code}
                    label={item.name}
                    isChecked={item.iso_code === activeCurrency}
                    onClick={(e) => onClick && onClick(e)}
                />
            ))}
        </div>
    </>
}