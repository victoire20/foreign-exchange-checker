"use client"

import ChartHistory from "@/components/features/history/Chart";
import {Card} from "@/components/ui/card";
import {Rate} from "@/components/features/convert-wrapper/currency-selector/types/forex.type";
import {useCompareYesterdayRate} from "@/components/features/convert-wrapper/currency-selector/hooks/useForex";
import {useEffect, useState} from "react";


interface Props {
    rate: Rate;
    currenciesIsLoading: boolean;
}

const HistoryDetails = ({ rate, currenciesIsLoading }: Props) => {
    const [period, setPeriod] = useState<string>('d')
    const [change, setChange] = useState<string>('0')
    const [percent, setPercent] = useState<number>(0)

    const { data: historyRate = [], isLoading, isError, error, refetch } = useCompareYesterdayRate({
        b: rate.base,
        q: rate.quote,
        p: period
    })

    const handleRefetch = async (p: string) => {
        setPeriod(p)
        await refetch()
    }

    useEffect(() => {
        if (!historyRate || historyRate.length === 0) return

        const firstRate = historyRate[0].rate
        const lastRate = historyRate[historyRate.length - 1].rate

        let numericChange = 0
        let numericPercent = 0

        if (historyRate.length > 1) {
            numericChange = firstRate - lastRate
            numericPercent = firstRate !== 0 ? (numericChange / firstRate) : 0
        }

        setChange(numericChange.toFixed(5))
        setPercent(numericPercent)
    }, [historyRate])

    if (isError) {
        return <>
            <div className="bg-[#171719] border border-[#202022] px-3 py-4 md:px-5 md:py-5  min-h-37.5 rounded-2xl flex justify-center items-center m-0">
                <p className="text-center text-[#A0A0A5]">{error.message}</p>
            </div>
        </>
    }

    // Valeurs par défaut pendant le loading
    const openValue = isLoading ? "" : (historyRate.length > 1 ? String(historyRate[0].rate) : String(historyRate.at(-1)?.rate) ?? "")
    const lastValue = isLoading ? "" : String(historyRate.at(-1)?.rate ?? "")

    return <>
        <div className="flex flex-col gap-5 lg:flex-row lg:justify-between lg:items-center">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 md:gap-4 lg:max-w-[80%]">
                <Card
                    isLoading={isLoading}
                    label="open"
                    value={openValue}
                />
                <Card 
                    isLoading={isLoading} 
                    label="last" 
                    value={lastValue} 
                />
                <Card
                    isLoading={isLoading || currenciesIsLoading}
                    label="change"
                    value={`${+change > 0 ? '+' : ''}${change}`}
                    classNameValue={+change >= 0 ? 'text-[#42EB05]' : 'text-[red]'} />
                <Card
                    classNameValue={+change >= 0 ? 'text-[#42EB05]' : 'text-[red]'}
                    isLoading={isLoading || currenciesIsLoading}
                    label="% change"
                    value={`${percent > 0 ? '▲ ' : percent < 0 ? '▼ ' : ''}${Math.abs(Number(percent)).toFixed(5)}`}
                />
            </div>
            <nav
                className={`${(isLoading || currenciesIsLoading) && 'skeleton-item'} p-0.5 max-w-71.5 rounded-lg bg-[#171719] flex 
                justify-between items-center text-[#9D9D9D] text-[12px] leading-[120%] tracking-[0.5px]`}>
                <button
                    disabled={isLoading || currenciesIsLoading}
                    className={
                        `${(isLoading || currenciesIsLoading) && 'skeleton-item'} px-4 py-3 disabled:cursor-not-allowed
                         ${period === 'd' ?
                            'text-white rounded-lg bg-[#2E2E2E]' :
                            'hover:text-white hover:bg-[#2E2E2E] hover:rounded-lg focus-visible:rounded-lg md:cursor-pointer'
                        }`
                    }
                    onClick={() => handleRefetch('d')}
                >1D</button>
                <button
                    disabled={isLoading || currenciesIsLoading}
                    className={
                        `${(isLoading || currenciesIsLoading) && 'skeleton-item'} px-4 py-3 disabled:cursor-not-allowed
                         ${period === 'w' ? 
                            'text-white rounded-lg bg-[#2E2E2E]' : 
                            'hover:text-white hover:bg-[#2E2E2E] hover:rounded-lg focus-visible:rounded-lg md:cursor-pointer'
                         }`
                    }
                    onClick={() => handleRefetch('w')}
                >1W</button>
                <button
                    disabled={isLoading || currenciesIsLoading}
                    className={
                        `${(isLoading || currenciesIsLoading) && 'skeleton-item'} px-4 py-3 disabled:cursor-not-allowed
                         ${period === 'm' ?
                            'text-white rounded-lg bg-[#2E2E2E]' :
                            'hover:text-white hover:bg-[#2E2E2E] hover:rounded-lg focus-visible:rounded-lg md:cursor-pointer'
                        }`
                    }
                    onClick={() => handleRefetch('m')}
                >1M</button>
                <button
                    disabled={isLoading || currenciesIsLoading}
                    className={
                        `${(isLoading || currenciesIsLoading) && 'skeleton-item'} px-4 py-3 disabled:cursor-not-allowed
                         ${period === '3m' ?
                            'text-white rounded-lg bg-[#2E2E2E]' :
                            'hover:text-white hover:bg-[#2E2E2E] hover:rounded-lg focus-visible:rounded-lg md:cursor-pointer'
                        }`
                    }
                    onClick={() => handleRefetch('3m')}
                >3M</button>
                <button
                    disabled={isLoading || currenciesIsLoading}
                    className={
                        `${(isLoading || currenciesIsLoading) && 'skeleton-item'} px-4 py-3 disabled:cursor-not-allowed
                         ${period === 'y' ?
                            'text-white rounded-lg bg-[#2E2E2E]' :
                            'hover:text-white hover:bg-[#2E2E2E] hover:rounded-lg focus-visible:rounded-lg md:cursor-pointer'
                        }`
                    }
                    onClick={() => handleRefetch('y')}
                >1Y</button>
                <button
                    disabled={isLoading || currenciesIsLoading}
                    className={
                        `${(isLoading || currenciesIsLoading) && 'skeleton-item'} px-4 py-3 disabled:cursor-not-allowed
                         ${period === '5y' ?
                            'text-white rounded-lg bg-[#2E2E2E]' :
                            'hover:text-white hover:bg-[#2E2E2E] hover:rounded-lg focus-visible:rounded-lg md:cursor-pointer'
                        }`
                    }
                    onClick={() => handleRefetch('5y')}
                >5Y</button>
            </nav>
        </div>

        <ChartHistory isLoading={isLoading || currenciesIsLoading} rate={rate} historyRate={historyRate} period={period} />
    </>
}

export default HistoryDetails