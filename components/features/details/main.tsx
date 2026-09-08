"use client";

import {useMemo, useState} from "react"
import {Select} from "@/components/ui/select"
import {Badge} from "@/components/ui/badge"
import CompareList from "@/components/features/compare/CompareList"
import FavoriteList from "@/components/features/favorite/FavoriteList"
import LogList from "@/components/features/log/LogList"
import HistoryDetails from "@/components/features/history/HistoryDetails"
import {Currency, Log, Rate, FavoritePair} from "@/components/features/convert-wrapper/currency-selector/types/forex.type"
import {useCompareYesterdayRate} from "@/components/features/convert-wrapper/currency-selector/hooks/useForex"
import {Toast} from "@/components/ui/toast"


interface Props {
    rate: Rate;
    baseValue: string;
    isLoading: boolean;
    currencies: Currency[];
    logData: Log[];
    onDeleteLog: (index: number) => void;
    onClearLogs: () => void;
    favorites: FavoritePair[];
    onDeleteFavorite: (index: number) => void;
    onAddFavorite: (base: string, quote: string) => void;
    onDeleteFavoriteByCode: (base: string, quote: string) => void;
    onSelectFavorite: (favorite: FavoritePair) => void;
}

export default function Details({
    rate,
    baseValue,
    isLoading,
    currencies,
    logData,
    onDeleteLog,
    onClearLogs,
    favorites,
    onDeleteFavorite,
    onAddFavorite,
    onDeleteFavoriteByCode,
    onSelectFavorite,
}: Props) {

    const { data: compareRates = [] } = useCompareYesterdayRate({b: rate.base})
    const [showToastDelete, setShowToastDelete] = useState(false)
    const [showFavoriteToast, setShowFavoriteToast] = useState(false)
    const [favoriteToastMessage, setFavoriteToastMessage] = useState("")

    const handleDeleteLog = (index: number) => {
        onDeleteLog(index)
        setShowToastDelete(true)
        setTimeout(() => setShowToastDelete(false), 3000)
    }

    const handleClearLogs = () => {
        onClearLogs()
        setShowToastDelete(true)
        setTimeout(() => setShowToastDelete(false), 3000)
    }

    const handleDeleteFavoriteItem = (index: number) => {
        onDeleteFavorite(index)
        setShowFavoriteToast(true)
        setTimeout(() => setShowFavoriteToast(false), 3000)
    }

    const handleToggleCompareFavorite = (quote: string) => {
        const base = rate.base.toUpperCase()
        const normalizedQuote = quote.toUpperCase()
        const isFavorite = favorites.some(
            (favorite) =>
                favorite.base.toUpperCase() === base &&
                favorite.quote.toUpperCase() === normalizedQuote
        )

        if (isFavorite) {
            onDeleteFavoriteByCode(base, normalizedQuote)
            setFavoriteToastMessage("Removed from favorites")
        } else {
            onAddFavorite(base, normalizedQuote)
            setFavoriteToastMessage("Added to favorites")
        }

        setShowFavoriteToast(true)
        setTimeout(() => setShowFavoriteToast(false), 3000)
    }

    const compareData = useMemo(() => {
        const amount = Number(baseValue) || 1
        const currenciesByCode = new Map(
            currencies.map((currency) => [currency.iso_code.toUpperCase(), currency])
        )

        if (amount <= 0) return []

        return compareRates
            .filter((item) => item.quote !== item.base)
            .map((item) => {
                const currency = currenciesByCode.get(item.quote.toUpperCase())

                return {
                    flag: `https://res.cloudinary.com/ckiepogy/image/upload/v1788561262/${item.quote.slice(0, 2).toLowerCase()}.svg`,
                    codeIso: item.quote.toLowerCase(),
                    name: currency?.name ?? item.quote,
                    value: (amount * item.rate).toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 5,
                    }),
                    indice: item.rate.toFixed(4),
                    isFavorite: favorites.some(
                        (favorite) =>
                            favorite.base.toUpperCase() === rate.base.toUpperCase() &&
                            favorite.quote.toUpperCase() === item.quote.toUpperCase()
                    ),
                }
            })
    }, [baseValue, currencies, compareRates, favorites, rate.base])

    const tabsContent = [
        {
            label: "history",
            value: "history",
            content: <HistoryDetails currenciesIsLoading={isLoading} rate={rate} />
        },
        {
            label: "compare",
            value: "compare",
            content: (
                <CompareList
                    baseValue={baseValue}
                    currenciesIsLoading={isLoading}
                    base={rate.base}
                    data={compareData}
                    onToggleFavorite={handleToggleCompareFavorite}
                />
            )
        },
        {
            label: "favorites",
            value: "favorites",
            badge: favorites.length,
            content: (
                <FavoriteList
                    favorites={favorites}
                    onDeleteFavorite={handleDeleteFavoriteItem}
                    onSelectFavorite={onSelectFavorite}
                />
            )
        },
        {
            label: "Log",
            value: "log",
            badge: logData.length,
            content: <LogList data={logData} onClick={handleDeleteLog} onClear={handleClearLogs} />
        }
    ]

    const [activeTab, setActiveTab] = useState<string>(tabsContent[0].value)

    return <div className="flex flex-col gap-4 mt-10">
        {showToastDelete && <Toast message="Log deleted successfully" onClose={() => setShowToastDelete(false)} />}
        {showFavoriteToast && <Toast message={favoriteToastMessage} onClose={() => setShowFavoriteToast(false)} />}
        {/* Bloc Mobile (visible uniquement sous 768px) */}
        <Select
            value={activeTab}
            onChange={(newValue) => setActiveTab(newValue)}
            options={tabsContent}
            className="md:hidden"
        />

        {/* Bloc Tablette/Desktop (masqué sous 768px, visible au-dessus) */}
        <nav className="hidden md:flex gap-2 border-b border-[#202022] text-base leading-[1.2] tracking-wider text-[#A0A0A5]">
            {tabsContent.map((tab, index) => (
                <button
                    key={index}
                    onClick={() => setActiveTab(tab.value)}
                    className={`
                       ${typeof tab.badge === 'number' && tab.badge >= 0 && 'flex gap-2'} uppercase px-4 py-[10.5px] 
                       ${activeTab === tab.value ? 'border-b-2 border-[#CEF739] text-white' : 'border-b-2 border-transparent'} 
                       hover:text-white transition-all duration-300 md:cursor-pointer focus-visible:rounded-sm 
                        ${isLoading && 'skeleton-item'}
                    `}>
                    {tab.label}
                    {typeof tab.badge === 'number' && tab.badge >= 0 && (
                        <Badge isLoading={isLoading} value={tab.badge} />
                    )}
                </button>
            ))}
        </nav>

        {/* Historique, compare, favorites and logs div */}
        {tabsContent.find((tab) => tab.value === activeTab)?.content}
    </div>
}