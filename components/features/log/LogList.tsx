import {FaArrowRight} from "react-icons/fa";
import {LuTrash} from "react-icons/lu";
import {Log} from "@/components/features/convert-wrapper/currency-selector/types/forex.type";
import {formatTimeAgo} from "@/utils/dateFormat";
import {useEffect, useState} from "react";


interface Props {
    data: Array<Log>;
    onClick: (index: number) => void;
    onClear: () => void;
}

const LogList = ({ data, onClick, onClear }: Props) => {
    const [isHydrated, setIsHydrated] = useState(false)

    useEffect(() => {
        setIsHydrated(true)
    }, [])

    return <div className="bg-[#171719] border border-[#202022] p-[16px] md:p-[20px] rounded-[16px]">
        {data.length > 0 ? (
            <>
                <div className="uppercase flex flex-col md:flex-row md:items-center justify-between gap-[10px] mb-[20px]">
                    <span className="text-[16px] leading-[120%] tracking-[1px]">conversion log</span>
                    <div className="flex justify-between items-center md:gap-[16px]">
                        <span className="text-[#FFF] opacity-70 text-[12px] leading-[120%] tracking-[0.5px]">{data.length} logged</span>
                        <button
                            onClick={() => onClear()}
                            className="uppercase py-[8px] px-[12px] text-[#9D9D9D] text-[12px] leading-[120%]
                                tracking-[0.5px] bg-[#202022] border border-[#3D3D3D] rounded-[8px] hover:bg-[#3D3D3D] hover:border-[#3D3D3D] md:cursor-pointer">
                            clear all
                        </button>
                    </div>
                </div>
                <div className="flex flex-col gap-[12px]">
                    {data.map((item, index) => (
                        <div
                            key={index}
                            className="flex flex-row justify-between bg-[#202022] border border-[#2E2E2E] p-[12px] rounded-[8px]">
                            <div className="flex flex-col gap-[4px] md:flex-row md:justify-between md:gap-[48px] md:items-center">
                                <span className="text-[#9D9D9D] text-[14px] leading-[120%] tracking-[1px] uppercase">
                                    {isHydrated ? formatTimeAgo(new Date(item.time)) : "—"}
                                </span>
                                <div className="uppercase flex gap-[8px] items-center text-[14px] leading-[120%] tracking-[1px]">
                                    {item.pair[0]} <FaArrowRight className="text-[#9D9D9D] text-[10px]" /> {item.pair[1]}
                                </div>
                            </div>
                            <div className="flex gap-[10px] items-center">
                                <div className="flex flex-col justify-between md:flex-row md:gap-[20px] text-right">
                                    <span className="text-[#C6C6C6] text-[16px] leading-[120%] tracking-[1px]">{item.value}</span>
                                    <span className="text-[#CEF739] text-[16px] leading-[120%] tracking-[1px]">{item.convertor}</span>
                                </div>
                                <button
                                    onClick={() => onClick(index)}
                                    className="p-[10px] bg-[#202022] border border-[#2E2E2E] rounded-[8px]
                                        hover:bg-[#3D3D3D] hover:border-[#3D3D3D] md:cursor-pointer">
                                    <LuTrash />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </>
        ) : (
            <div className="text-center py-[20px] px-[80px] md:py-[40px] md:px-[120px]">
                <h2 className="text-[#C6C6C6] text-[20px] leading-[120%] -tracking-[0.5px] mb-[16px]">No conversions logged yet</h2>
                <p className="text-[#9D9D9D] text-[14px] leading-[120%] tracking-[1px]">
                    Every conversion is recorded here automatically when you tap Log conversion. Your log is private to this session and this browser.
                </p>
            </div>
        )}
    </div>
}

export default LogList