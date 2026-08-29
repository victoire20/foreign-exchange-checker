import {Currency, Rate} from "@/components/features/convert-wrapper/currency-selector/types/forex.type";
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

export async function getLiveMarkets(principalBase: Array<string>):  Promise<Rate[]> {
    if (!uri) {
        throw new Error("No Live markets provided")
    }

    const today = new Date().toISOString().split('T')[0]

    // 1. Crée un tableau de promesses (les requêtes s'exécutent en parallèle)
    const promises = principalBase.map(async (base) => {
        const baseUpper = base.toUpperCase()
        const url = `${uri}/rates?base=${baseUpper}&from=${today}`

        const response = await fetch(url, { next: { revalidate: 3600 } })
        if (!response.ok) {
            throw new Error(`Failed to fetch market data for ${baseUpper}`)
        }

        // Correction ici : le JSON retourné par l'API est un tableau (Rate[])
        const data = await response.json();
        return data as Rate[];
    })

    const results = await Promise.allSettled(promises)

    // 2. Filtrer les succès et APLATIR les tableaux avec flatMap
    return results
        .filter((result): result is PromiseFulfilledResult<Rate[]> => result.status === 'fulfilled')
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