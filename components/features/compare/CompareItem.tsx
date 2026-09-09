import {CurrencyFlag} from "@/components/ui/currency-flag";
import {FaStar} from "react-icons/fa";
import {CiStar} from "react-icons/ci";


type Currency = {
    flag: string;
    codeIso: string;
    name: string;
    value: string;
    indice: string;
    isFavorite: boolean;
}

interface Props {
    onToggleFavorite: (quote: string) => void;
    item: Currency;
}


const CompareItemPair = ({ onToggleFavorite, item}: Props) => {
    return <div onClick={() => onToggleFavorite(item.codeIso)}
            className="p-3 min-w-full bg-[#202022] border border-[#2E2E2E] hover:border-[#454547] rounded-[10px] flex
            justify-between items-center md:cursor-pointer">
        <div className="flex gap-2.5 items-center">
            <div>
                <CurrencyFlag
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
            <div className="flex flex-col gap-1.5 justify-between">
                <span className="uppercase text-[14px] leading-[120%] tracking-[1px]">{item.codeIso}</span>
                <span className="capitalize text-[#9D9D9D] text-[12px] leading-[120%] tracking-[0.5px]">{item.name}</span>
            </div>
        </div>
        <div className="flex gap-2.5 items-center">
            <div className="flex flex-col gap-1.5 justify-between text-right">
                <span className="text-[16px] leading-[120%] tracking-[1px]">{item.value}</span>
                <span className="text-[#9D9D9D] text-[10px] leading-[100%] tracking-normal">@ {item.indice}</span>
            </div>
            <button
                type="button"
                aria-label={item.isFavorite ? `Remove ${item.codeIso} from favorites` : `Add ${item.codeIso} to favorites`}
                onClick={(event) => {
                    event.stopPropagation()
                    onToggleFavorite(item.codeIso)
                }}
                className={`p-2 bg-[#202022] border border-[#2E2E2E] rounded-lg hover:bg-[#3D3D3D] md:cursor-pointer ${item.isFavorite && 'border-[#CEF739]'}`}>
                {item.isFavorite ? (
                    <FaStar className="text-[#CEF739]" />
                ) : (
                    <CiStar />
                )}
            </button>
        </div>
    </div>
}


export default CompareItemPair