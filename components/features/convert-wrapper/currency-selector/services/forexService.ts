import {Currency, LiveMarketRate, Rate} from "@/components/features/convert-wrapper/currency-selector/types/forex.type";
import {getSubtractDate} from "@/utils/dateCalcul";

interface RateProps {
    base: string;
    quote: string;
}

interface HistoryRate {
    base: string;
    quote?: string;
    period?: string;
}

const uri = `https://api.frankfurter.dev/v2`

export async function getCurrencies(): Promise<Currency[]> {
    try {

        if (!uri) {
            throw new Error("No URI provided")
        }

        const url = `${uri}/currencies`

        const response = await fetch(url, {
            next: {
                revalidate: 3600,
            },
        })

        if (!response.ok) {
            throw  new Error(`HTTP Error : ${response.statusText}`)
        }

        return await response.json()
    } catch (e) {
        return []
    }
}

export async function getRate({ base, quote }: RateProps): Promise<Rate> {
    if (!uri) {
        throw new Error("No rate provided")
    }

    const url = `${uri}/rate/${base.toUpperCase()}/${quote.toUpperCase()}`

    const response = await fetch(url, {
        next: {
            revalidate: 3600,
        },
    })

    if (!response.ok) {
        throw new Error(`HTTP Error : ${response.status}`)
    }

    return await response.json()
}

export async function getLiveMarkets(principalBase: Array<string>): Promise<LiveMarketRate[]> {
    if (!uri) {
        throw new Error("No Live markets provided")
    }

    const today = new Date().toISOString().split('T')[0]
    const previousDay = getSubtractDate('d').toISOString().split('T')[0]

    const promises: Promise<LiveMarketRate[]>[] = principalBase.map(async (base) => {
        const baseUpper = base.toUpperCase()
        const [currentResponse, previousResponse] = await Promise.all([
            fetch(`${uri}/rates?base=${baseUpper}&from=${today}`, {
                next: { revalidate: 3600 },
            }),
            fetch(`${uri}/rates?base=${baseUpper}&from=${previousDay}&to=${previousDay}`, {
                next: { revalidate: 3600 },
            }),
        ])

        if (!currentResponse.ok || !previousResponse.ok) {
            throw new Error(`Failed to fetch market comparison for ${baseUpper}`)
        }

        const [currentData, previousData] = await Promise.all([
            await currentResponse.json() as Promise<Rate[]>,
            await previousResponse.json() as Promise<Rate[]>,
        ])
        const previousByQuote = new Map(previousData.map((rate) => [rate.quote, rate.rate]))
        const currentByQuote = new Map(currentData.map((rate) => [rate.quote, rate]))

        return Array.from(currentByQuote.values()).map((current) => {
            const previousRate = previousByQuote.get(current.quote)
            const percent = previousRate && previousRate !== 0
                ? ((current.rate - previousRate) / previousRate) * 100
                : undefined

            return {
                ...current,
                previousRate,
                percent,
            }
        })
    })

    const results = await Promise.allSettled(promises)

    // 2. Filtrer les succès et APLATIR les tableaux avec flatMap
    return results
        .filter((result): result is PromiseFulfilledResult<LiveMarketRate[]> => result.status === 'fulfilled')
        .flatMap(result => result.value) // flatMap extrait et fusionne les tableaux [ [Rate, Rate], [Rate, Rate] ] en [ Rate, Rate, Rate, Rate ]
}

export async function getCompareYesterdayRate({ base, quote, period }: HistoryRate): Promise<Rate[]> {
    if (!uri) {
        throw new Error("No URI provided")
    }

    let url = `${uri}/rates?base=${base.toUpperCase()}`
    if (period !== undefined && period !== '') {
        const from = getSubtractDate(period)
        url += `&from=${from.toISOString().split('T')[0]}`
    }
    if (quote) {
        url += `&quotes=${quote?.toUpperCase()}`
    }
    const response = await fetch(url, { next: {revalidate: 3600} })

    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`)
    }

    return await response.json()
}