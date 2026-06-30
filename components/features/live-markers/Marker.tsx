import Marquee from "react-fast-marquee";
import Image from "next/image";

export const Marker = () => {
    const data = [
        {
            pair: "USD/JPY",
            index: 154.30,
            percent: 0.40
        },
        {
            pair: "EUR/USD",
            index: 1.0845,
            percent: -0.12
        },
        {
            pair: "GBP/USD",
            index: 1.2678,
            percent: 0.35
        },
        {
            pair: "USD/CAD",
            index: 1.3612,
            percent: -0.08
        },
        {
            pair: "AUD/USD",
            index: 0.6584,
            percent: 0.22
        },
        {
            pair: "USD/CHF",
            index: 0.8956,
            percent: -0.15
        },
        {
            pair: "EUR/JPY",
            index: 167.42,
            percent: 0.57
        },
        {
            pair: "GBP/JPY",
            index: 195.36,
            percent: -0.31
        }
    ];

    return <Marquee>
        {data.map(items => (
            <div key={items.pair} className="bg-[#2E2E2E] p-4 border-x-[#9D9D9D] flex gap-2.5">
                <span className="text-[#9D9D9D]">{items.pair}</span>
                <span>{items.index}</span>
                {items.percent >= 0 ?
                    (<span className="text-[#42EB05] flex items-center">▲ {items.percent}% </span>) :
                    (<span className="text-[#FF4141]">▼ {items.percent}%</span>)
                }
            </div>
        ))}
    </Marquee>
}