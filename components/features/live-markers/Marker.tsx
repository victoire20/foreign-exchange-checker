import Marquee from "react-fast-marquee";
import {Rate} from "@/components/features/convert-wrapper/currency-selector/types/forex.type";

interface Props {
    data: Array<Rate>;
    isLoading: boolean;
}

// pour le select de currencies https://api.twelvedata.com/countries?apikey=demo
// pour la valeur d'une unit en fonction de la paire choisie (EUR/USD) https://api.twelvedata.com/exchange_rate?symbol=EUR/USD&apikey=demo
// pour la valeur du montant de la paire choisie (EUR/USD) https://api.twelvedata.com/currency_conversion?symbol=EUR/USD&amount=100&apikey=demo

export const Marker = ({ data, isLoading }: Props) => {
    return <Marquee pauseOnHover={true} pauseOnClick={true}>
        {data.map((items, index) => (
            <div key={index} className={`${isLoading && 'skeleton-item'} w-[max-content] bg-[#2E2E2E] p-4 border-x-[#9D9D9D] flex gap-2.5`}>
                <span className={`${isLoading && 'skeleton-item'} text-[#9D9D9D]`}>{items.base}/{items.quote}</span>
                <span>{items.rate}</span>
                {
                //items.percent >= 0 ?
                items.rate >= 0 ?
                    (<span className={`${isLoading && 'skeleton-item'} text-[#42EB05] flex items-center`}>▲ {items.rate}% </span>) :
                    (<span className={`${isLoading && 'skeleton-item'} text-[#FF4141]`}>▼ {items.rate}%</span>)
                }
            </div>
        ))}
    </Marquee>
}