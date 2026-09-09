import {FavoritePair} from "@/components/features/convert-wrapper/currency-selector/types/forex.type";
import {useCompareYesterdayRate} from "@/components/features/convert-wrapper/currency-selector/hooks/useForex";
import {useEffect, useState} from "react";
import {FaArrowRight, FaCaretDown, FaCaretUp, FaStar} from "react-icons/fa";


interface Props {
    favorite: FavoritePair;
    index: number;
    onDelete: () => void;
    onSelect: () => void;
}


const FavoritePairItem = ({
  favorite,
  index,
  onDelete,
  onSelect,
}: Props) => {
    const { data: historyRate = [] } = useCompareYesterdayRate({
        b: favorite.base,
        q: favorite.quote,
        p: 'd'
    })

    const [rate, setRate] = useState(0)
    const [variation, setVariation] = useState(0)

    useEffect(() => {
        if (historyRate.length > 0) {
            const lastRate = historyRate[historyRate.length - 1]?.rate || 0
            const firstRate = historyRate[0]?.rate || lastRate

            setRate(lastRate)

            if (lastRate !== 0 && firstRate !== 0) {
                const change = lastRate - firstRate
                const percent = (change / firstRate) * 100
                setVariation(percent)
            }
        }
    }, [historyRate])

    return (
        <button
            key={index}
            onClick={onSelect}
            className="p-3 min-w-full bg-[#202022] border border-[#2E2E2E] hover:border-[#454547]
                rounded-[10px] flex justify-between items-center md:cursor-pointer"
        >
            <div className="uppercase flex gap-2 items-center text-[14px] leading-[120%] tracking-[1px]">
                {favorite.base} <FaArrowRight className="text-[#9D9D9D] text-[10px]" /> {favorite.quote}
            </div>
            <div className="flex gap-5 items-center">
                <div className="flex flex-col gap-1.5 justify-between items-end text-right">
                    <span className="text-[16px] leading-[120%] tracking-[1px] text-[#C6C6C6]">{rate.toFixed(4)}</span>
                    <span className={`${variation > 0 ? 'text-[#42EB05]' : 'text-[#FF4141]'} flex items-center text-[10px] leading-[100%] tracking-normal`}>
                        {variation > 0 ? (
                            <>
                                <FaCaretUp />&nbsp;{`+${variation.toFixed(2)}%`}
                            </>
                        ) : variation < 0 ? (
                            <>
                                <FaCaretDown />&nbsp;{`${variation.toFixed(2)}%`}
                            </>
                        ) : (
                            <>
                                <span>&nbsp;0.00%</span>
                            </>
                        )}
                    </span>
                </div>
                <button
                    onClick={(event) => {
                        event.stopPropagation()
                        onDelete()
                    }}
                    className={`p-2 bg-[#202022] border border-[#CEF739] rounded-lg hover:bg-[#3D3D3D] md:cursor-pointer transition-all duration-300`}>
                    <FaStar className="text-[#CEF739]" />
                </button>
            </div>
        </button>
    )
}

export default FavoritePairItem