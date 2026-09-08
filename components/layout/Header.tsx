import {NavBar} from "@/components/layout/NavBar";
import {LiveMarkers} from "@/components/features/live-markers/LiveMarkers";
import {useLiveMarkets} from "@/components/features/convert-wrapper/currency-selector/hooks/useForex";
import {useEffect, useState} from "react";


interface Props {
    currenciesCounter: number;
}

export const Header = ({ currenciesCounter }: Props) => {

    const { data: liveMarket = [], isLoading } = useLiveMarkets({
        principalBase: ['usd', 'eur', 'gbp', 'jpy', 'chf', 'cad', 'aud']
    })
    const [isHydrated, setIsHydrated] = useState(false)

    useEffect(() => {
        setIsHydrated(true)
    }, [])

    return <header>
        <NavBar
            isLoading={!isHydrated || isLoading}
            currenciesCounter={isHydrated ? currenciesCounter : 0}
        />
        <LiveMarkers
            data={isHydrated ? liveMarket : []}
            isLoading={!isHydrated || isLoading}
        />
    </header>
}