"use client"

import { Content } from "@/components/layout/Content";
import { ConvertWrapper } from "@/components/features/convert-wrapper/ConvertWrapper";
import Details from "@/components/features/details/main";
import {useEffect, useState} from "react";
import {Header} from "@/components/layout/Header";
import {
    useCurrencies,
    useRate
} from "@/components/features/convert-wrapper/currency-selector/hooks/useForex";
import {Currency, Log, FavoritePair} from "@/components/features/convert-wrapper/currency-selector/types/forex.type";
import {logStorage} from "@/utils/logStorage";
import {favoritePairStorage} from "@/utils/favoritePairStorage";


export default function Home() {

    const [baseDevice, setBaseDevice] = useState<Currency>()
    const [baseValue, setBaseValue] = useState<string>('')
    const [quoteDevice, setQuoteDevice] = useState<Currency>()
    const [quoteValue, setQuoteValue] = useState<string>('')
    const [logData, setLogData] = useState<Log[]>([])
    const [favorites, setFavorites] = useState<FavoritePair[]>([])
    const [isHydrated, setIsHydrated] = useState(false)

    const { data: currencies = [], isLoading: currenciesIsLoading } = useCurrencies()
    const { data: rate = { date: '', base: '', quote: '', rate: 0 }, isLoading: rateIsLoading } = useRate({
        b: baseDevice?.iso_code.toLowerCase() ?? 'usd',
        q: quoteDevice?.iso_code.toLowerCase() ?? 'eur'
    })

    useEffect(() => {
        // Charger les données depuis le localStorage au montage du composant (côté client)
        setLogData(logStorage.getLogs())
        setFavorites(favoritePairStorage.getFavoritePair())
        setIsHydrated(true)

        const handleStorageUpdate = () => {
            setFavorites(favoritePairStorage.getFavoritePair())
        }

        window.addEventListener("local-storage-update", handleStorageUpdate)
        return () => window.removeEventListener("local-storage-update", handleStorageUpdate)
    }, [])

    const renderedCurrencies = isHydrated ? currencies : []
    const renderedRate = isHydrated ? rate : { date: '', base: '', quote: '', rate: 0 }
    const contentIsLoading = !isHydrated || currenciesIsLoading || rateIsLoading

    const handleAddLog = (newLog: Log) => {
        logStorage.addLog(newLog)
        setLogData(logStorage.getLogs())
    }

    const handleDeleteLog = (index: number) => {
        logStorage.deleteLog(index)
        setLogData(logStorage.getLogs())
    }

    const handleClearLogs = () => {
        logStorage.clearLogsOnly()
        setLogData(logStorage.getLogs())
    }

    const handleAddFavorite = (base: string, quote: string) => {
        favoritePairStorage.addFavoritePair({ base, quote })
        setFavorites(favoritePairStorage.getFavoritePair())
    }

    const handleDeleteFavorite = (index: number) => {
        favoritePairStorage.deleteFavoritePair(index)
        setFavorites(favoritePairStorage.getFavoritePair())
    }

    const handleDeleteFavoriteByCode = (base: string, quote: string) => {
        favoritePairStorage.deleteFavoritePairByCode(base, quote)
        setFavorites(favoritePairStorage.getFavoritePair())
    }

    return (
        <>
            <Header currenciesCounter={isHydrated ? currencies.length : 0} />
            <Content>
                <ConvertWrapper
                    currencies={renderedCurrencies}
                    isLoading={contentIsLoading}
                    rate={renderedRate}
                    baseDevice={baseDevice}
                    setBaseDevice={setBaseDevice}
                    baseValue={baseValue}
                    setBaseValue={setBaseValue}
                    quoteDevice={quoteDevice}
                    setQuoteDevice={setQuoteDevice}
                    quoteValue={quoteValue}
                    setQuoteValue={setQuoteValue}
                    onAddLog={handleAddLog}
                    favorites={favorites}
                    onAddFavorite={handleAddFavorite}
                    onDeleteFavorite={handleDeleteFavoriteByCode}
                />
                <Details
                    baseValue={baseValue}
                    isLoading={contentIsLoading}
                    rate={renderedRate}
                    currencies={renderedCurrencies}
                    logData={logData}
                    onDeleteLog={handleDeleteLog}
                    onClearLogs={handleClearLogs}
                    favorites={favorites}
                    onDeleteFavorite={handleDeleteFavorite}
                    onAddFavorite={handleAddFavorite}
                    onDeleteFavoriteByCode={handleDeleteFavoriteByCode}
                />
            </Content>
        </>
    )
}
