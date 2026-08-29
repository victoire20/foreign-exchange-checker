import {NavBar} from "@/components/layout/NavBar";
import {LiveMarkers} from "@/components/features/live-markers/LiveMarkers";
import {useLiveMarkets} from "@/components/features/convert-wrapper/currency-selector/hooks/useForex";


interface Props {
    currenciesCounter: number;
}

export const Header = ({ currenciesCounter }: Props) => {

    const { data: liveMarket = [], isLoading } = useLiveMarkets({
        principalBase: ['usd', 'eur', 'gbp', 'jpy', 'chf', 'cad', 'aud']
    })

    return <header>
        <NavBar isLoading={isLoading} currenciesCounter={currenciesCounter}/>
        <LiveMarkers data={liveMarket} isLoading={isLoading} />
    </header>
}