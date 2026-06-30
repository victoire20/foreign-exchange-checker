import {Marker} from "@/components/features/live-markers/Marker";

export const LiveMarkers = () => {
    return <div className="flex items-center static">
        <div
            className="shrink-0 bg-[#CEF739] font-bold text-[#0A0A0A] text-[10px] leading-[100%] tracking-normal w-max
            py-3 px-2 opacity-100 flex items-center gap-1.25 before:content-['•'] before:text-[#0A0A0A] before:text-3xl
            md:text-[12px] md:leading-[130%] md:tracking-[0.5px]"
        >
            Live markets
        </div>

        <div className="flex-1 min-w-0">
            <Marker />
        </div>
    </div>
}