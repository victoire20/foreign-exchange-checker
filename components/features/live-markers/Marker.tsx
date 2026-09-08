import Marquee from "react-fast-marquee";
import {FaCaretDown, FaCaretUp} from "react-icons/fa";
import {LiveMarketRate} from "@/components/features/convert-wrapper/currency-selector/types/forex.type";

interface Props {
    data: Array<LiveMarketRate>;
    isLoading: boolean;
}

export const Marker = ({ data, isLoading }: Props) => {
    const markerData = isLoading && data.length === 0
        ? Array.from({length: 7}, () => null)
        : data

    return <Marquee pauseOnHover={true} pauseOnClick={true}>
        {markerData.map((items, index) => (
            <div key={index} className={`${isLoading ? 'skeleton-item' : ''} w-[max-content] bg-[#2E2E2E] p-4 border-x-[#9D9D9D] flex gap-2.5`}>
                <span className="text-[#9D9D9D]">
                    {items ? `${items.base}/${items.quote}` : '\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0'}
                </span>
                <span>{items ? items.rate : '\u00a0\u00a0\u00a0\u00a0\u00a0'}</span>
                {items?.percent === undefined ? (
                    <span>{items ? '' : '\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0'}</span>
                ) : items.percent > 0 ? (
                    <span className="text-[#42EB05] flex items-center">
                        <FaCaretUp />&nbsp;+{items.percent.toFixed(4)}%
                    </span>
                ) : items.percent < 0 ? (
                    <span className="text-[#FF4141] flex items-center">
                        <FaCaretDown />&nbsp;-{Math.abs(items.percent).toFixed(4)}%
                    </span>
                ) : (
                    <span className="text-[#9D9D9D]">
                        0.0000%
                    </span>
                )}
            </div>
        ))}
    </Marquee>
}