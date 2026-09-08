import Image from "next/image"
import {FaStar} from "react-icons/fa"
import {Select} from "@/components/features/convert-wrapper/currency-selector/Select"
import {ChangeEvent, useMemo, useState} from "react"
import {Currency, Log, Rate, FavoritePair} from "@/components/features/convert-wrapper/currency-selector/types/forex.type"
import {Toast} from "@/components/ui/toast";


interface Props {
    currencies: Array<Currency>;
    isLoading: boolean;
    rate: Rate,
    baseDevice?: Currency;
    setBaseDevice: (value: Currency) => void;
    baseValue: string;
    setBaseValue: (value: string) => void;
    quoteDevice?: Currency;
    setQuoteDevice: (value: Currency) => void;
    quoteValue: string;
    setQuoteValue: (value: string) => void;
    onAddLog: (log: Log) => void;
    favorites: FavoritePair[];
    onAddFavorite: (base: string, quote: string) => void;
    onDeleteFavorite: (base: string, quote: string) => void;
}

export const ConvertWrapper = ({
    currencies,
    isLoading,
    rate,
    baseDevice,
    setBaseDevice,
    baseValue,
    setBaseValue,
    quoteDevice,
    setQuoteDevice,
    quoteValue,
    setQuoteValue,
    onAddLog,
    favorites,
    onAddFavorite,
    onDeleteFavorite,
}: Props) => {
    const [isOpenBase, setIsOpenBase] = useState<boolean>(false)
    const [isOpenQuote, setIsOpenQuote] = useState<boolean>(false)
    const [searchKey, setSearchKey] = useState<string>('')
    const [showToastLog, setShowToastLog] = useState(false)
    const [showToastFavorite, setShowToastFavorite] = useState(false)
    const [toastMessage, setToastMessage] = useState("")

    const currentBase = baseDevice?.iso_code.toUpperCase() || rate.base.toUpperCase()
    const currentQuote = quoteDevice?.iso_code.toUpperCase() || rate.quote.toUpperCase()
    const selectedBaseCode = baseDevice?.iso_code.toLowerCase() || 'usd'
    const selectedQuoteCode = quoteDevice?.iso_code.toLowerCase() || 'eur'
    const isCurrentPairFavorite = favorites.some(
        fav => fav.base.toUpperCase() === currentBase && fav.quote.toUpperCase() === currentQuote
    )

    const filterData = useMemo<Currency[]>(() => {
        const cleanSearch = searchKey.trim().toLowerCase()
        if (cleanSearch !== '') {
            return currencies.filter((currency: Currency) =>
                currency.iso_code.toLowerCase().includes(cleanSearch) ||
                currency.name.toLowerCase().includes(cleanSearch)
            )
        }

        return currencies
    }, [currencies, searchKey])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchKey(e.target.value)
    }

    const handleChooseBaseDevice = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.stopPropagation()

        const value = e.currentTarget.getAttribute('data-value')?.toLowerCase()
        if (!value) return
        if (value === selectedQuoteCode) return

        const selectedCurrency =
            filterData.find((currency: Currency) => currency.iso_code.toLowerCase() === value)

        if (selectedCurrency) setBaseDevice(selectedCurrency)
        setSearchKey('')
        setIsOpenBase(false)
    }

    const handleFavorite = () => {
        const base = baseDevice?.iso_code || rate.base
        const quote = quoteDevice?.iso_code || rate.quote

        if (isCurrentPairFavorite) {
            onDeleteFavorite(base, quote)
            setToastMessage("Removed from favorites")
        } else {
            onAddFavorite(base, quote)
            setToastMessage("Added to favorites")
        }
        
        setShowToastFavorite(true)
        setTimeout(() => setShowToastFavorite(false), 3000)
    }

    const handleLog = () => {
        const newLog: Log = {
            'time': String(new Date(Date.now())),
            'pair': [baseDevice?.iso_code || rate.base, quoteDevice?.iso_code || rate.quote],
            'value': baseValue || String(1),
            'convertor': quoteValue || String(rate.rate)
        }

        onAddLog(newLog)
        setShowToastLog(true)
        setTimeout(() => setShowToastLog(false), 3000)
    }

    const handleChooseRatingDevise = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.stopPropagation()

        const value = e.currentTarget.getAttribute('data-value')?.toLowerCase()
        if (!value) return
        if (value === selectedBaseCode) return

        const selectedCurrency =
            filterData.find((currency: Currency) => currency.iso_code.toLowerCase() === value)

        if (selectedCurrency) setQuoteDevice(selectedCurrency)
        setSearchKey('')
        setIsOpenQuote(false)
    }

    const handleSwapDevice = () => {
        const currentBase = baseDevice ?? filterData.find((c: Currency) => c.iso_code.toLowerCase() === 'usd')!
        const currentRating = quoteDevice ?? filterData.find((c: Currency) => c.iso_code.toLowerCase() === 'eur')!

        setBaseDevice(currentRating)
        setQuoteDevice(currentBase)

        setBaseValue(quoteValue)
        setQuoteValue(baseValue)
    }

    return <>
        {showToastLog && <Toast message="Conversion logged successfully" onClose={() => setShowToastLog(false)} />}
        {showToastFavorite && <Toast message={toastMessage} onClose={() => setShowToastFavorite(false)} />}
        <h1
            className="text-[20px] font-bold leading-[120%] tracking-[-0.5px] uppercase pb-4 md:text-[20px]
            md:leading-[140%] md:tracking-[-0.5%]">
            Check the rate
        </h1>
        <div className="bg-[#171719] rounded-[20px]">
            <div className="p-4 flex flex-col gap-4 md:flex-row md:justify-between md:p-5">
                <div className={
                        `${isLoading && 'skeleton-item'} bg-[#202022] border border-[#2E2E2E] h-27.25 rounded-2xl p-4 
                        flex flex-col justify-between gap-5 md:min-w-[40%]`
                    }
                >
                    <span className="uppercase text-[#C6C6C6] text-[14px] leading-[120%] tracking-[1px]">
                        {!isLoading && "send"}
                    </span>
                    <div className="relative flex justify-between items-center">
                        {!isLoading && <>
                            <input
                                type="text"
                                inputMode="decimal"
                                value={baseValue}
                                onChange={(e) => {
                                    let rawValue = e.target.value
                                    rawValue = rawValue.replace(/\s+/g, '')
                                    rawValue = rawValue.replace(',', '.')

                                    if (/^\d*\.?\d*$/.test(rawValue)) {
                                        setBaseValue(rawValue)
                                        const q = parseFloat(rawValue) * rate?.rate
                                        setQuoteValue(rawValue ? String(q.toFixed(5)) : '')
                                    }
                                }}
                                placeholder="0.00"
                                className="text-[#FFF] text-[32px] leading-[100%] inputexch tracking-[-0.5px] w-full hover:underline"
                            />
                            <div>
                                <Select
                                    onChange={handleChange}
                                    onClick={() => setIsOpenBase((isOpen) => !isOpen)}
                                    onChoose={handleChooseBaseDevice}
                                    isOpen={isOpenBase}
                                    setIsOpen={setIsOpenBase}
                                    currencies={filterData}
                                    searchKey={searchKey}
                                    device={!baseDevice ? filterData.find(data => data.iso_code.toLowerCase() === 'usd') : baseDevice}
                                    isLoading={isLoading}
                                />
                            </div>
                        </>}
                    </div>
                </div>

                <button className={
                        `${isLoading && 'skeleton-item'} md:hidden bg-[#202022] border border-[#2E2E2E] rounded-2xl 
                        max-w-max mx-auto px-3.75 py-4 hover:bg-[#3D3D3D] hover:border-[#3D3D3D] md:cursor-pointer md:my-auto`
                    }
                    onClick={handleSwapDevice}
                >
                    {isLoading ?
                        <div className="w-[full-content]"></div> :
                        <Image src={'/images/icon-exchange-vertical.svg'} alt={`exchange`} width={20} height={20}/>
                    }
                </button>
                <button className={
                        `${isLoading && 'skeleton-item'} hidden md:block bg-[#202022] border border-[#2E2E2E] 
                        rounded-2xl max-w-max mx-auto px-3.75 py-4 hover:bg-[#3D3D3D] hover:border-[#3D3D3D] 
                        md:cursor-pointer md:my-auto`
                    }
                    onClick={handleSwapDevice}
                >
                    {isLoading ?
                        <div className="w-[full-content]"></div> :
                        <Image src={'/images/icon-exchange.svg'} alt={`exchange`} width={20} height={20}/>
                    }
                </button>

                <div className={
                        `${isLoading && 'skeleton-item'} bg-[#202022] border border-[#2E2E2E] h-27.25 rounded-2xl p-4 
                        flex flex-col justify-between gap-5 md:min-w-[40%]`
                    }
                >
                    <span className="uppercase text-[#C6C6C6] text-[14px] leading-[120%] tracking-[1px]">
                        {!isLoading && 'receive'}
                    </span>
                    <div className="relative flex justify-between items-center">
                        {!isLoading && <>
                            <input
                                type="text"
                                value={quoteValue}
                                onChange={(e) => {
                                    let rawValue = e.target.value
                                    rawValue = rawValue.replace(/\s+/g, '')
                                    rawValue = rawValue.replace(',', '.')

                                    if (/^\d*\.?\d*$/.test(rawValue)) {
                                        setQuoteValue(rawValue)
                                        const b = parseFloat(quoteValue) / rate?.rate
                                        setBaseValue(String(b.toFixed(5)))
                                    }
                                }}
                                placeholder="0.00"
                                className="text-[#CEF739] text-[32px] leading-[100%] inputexch tracking-[-0.5px] w-full hover:underline md:cursor-text"
                            />
                            <div>
                                <Select
                                    onChange={handleChange}
                                    onClick={() => setIsOpenQuote((isOpen) => !isOpen)}
                                    onChoose={handleChooseRatingDevise}
                                    isOpen={isOpenQuote}
                                    setIsOpen={setIsOpenQuote}
                                    currencies={filterData}
                                    searchKey={searchKey}
                                    device={!quoteDevice ? filterData.find(data => data.iso_code.toLowerCase() === 'eur') : quoteDevice}
                                    isLoading={isLoading}
                                />
                            </div>
                        </>}
                    </div>
                </div>
            </div>
            <div className="border-t border-[#2E2E2E] border-dashed p-4 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className={
                    `${isLoading && 'skeleton-item'} text-[#FFF] text-[10px] leading-[100%] tracking-normal 
                    md:text-[12px] md:leading-[120%] md:tracking-[0.5px]`
                }>
                    1 <span className="uppercase">{`${baseDevice?.iso_code.toLowerCase() || 'usd'}`}</span> = {rate.rate} <span className="uppercase">{`${quoteDevice?.iso_code.toLowerCase() || 'eur'}`}</span>
                </p>
                <div className="flex justify-between items-center gap-2">
                    <button
                        onClick={handleFavorite}
                        className={`${isCurrentPairFavorite ? (
                            "btn flex justify-center items-center gap-[9.73px] p-3 bg-[#202022] border border-[#CEF739] " +
                            "rounded-lg text-[12px] leading-[130%] tracking-[0.5px] md:cursor-pointer hover:bg-[#2E2E2E] " +
                            "hover:border-[#CEF739]"
                        ) : (
                            "btn flex justify-center items-center gap-[9.73px] p-3 bg-[#CEF739] border " +
                            "border-[#CEF739] text-[#0A0A0A] font-bold rounded-lg text-[12px] leading-[130%] tracking-[0.5px] md:cursor-pointer " +
                            "hover:bg-[#CEF739] hover:border-[#CEF739] hover:opacity-80"
                        )} ${isLoading && 'skeleton-item'}`}>
                        {isCurrentPairFavorite ? (
                            <FaStar className="w-[12.53px] h-3 text-[#CEF739]" />
                        ) : (
                            <FaStar className="w-[12.53px] h-3" />
                        )}
                        <span className="uppercase">favorite</span>
                    </button>
                    <button
                        onClick={handleLog}
                        className={
                            `${isLoading && 'skeleton-item'} btn uppercase px-3 py-3 rounded-lg border border-[#CEF739] 
                            hover:bg-[#283300] hover:border-[#CEF739] text-[12px] leading-[130%] tracking-[0.5px] 
                            md:cursor-pointer`}
                        >
                        log conversion
                    </button>
                </div>
            </div>
        </div>
    </>
}