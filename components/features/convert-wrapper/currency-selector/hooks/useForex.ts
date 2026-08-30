import {useQuery} from "@tanstack/react-query";
import {
    getCompareYesterdayRate,
    getCurrencies,
    getLiveMarkets,
    getRate
} from "@/components/features/convert-wrapper/currency-selector/services/forexService";


export const useCurrencies = () => {
    return useQuery({
        queryKey: ['currencies'],
        queryFn: getCurrencies,
    })
}

export const useRate = ({ b, q }: { b: string; q: string }) => {
    return useQuery({
        queryKey: ['rate', b, q],
        queryFn: () => getRate({ base: b, quote: q }),
        enabled: Boolean(b && q),
        staleTime: 3600000, // Équivalent du revalidate de Next.js (1 heure en cache client)
    });
}

export const useLiveMarkets = ({ principalBase }: { principalBase: Array<string> }) => {
    return useQuery({
        queryKey: ['liveMarkets', principalBase],
        queryFn: () => getLiveMarkets(principalBase),
        enabled: Boolean(principalBase),
        staleTime: 3600000,
    })
}

export const useCompareYesterdayRate = ({ b, q, p }: { b: string; q?: string, p?: string }) => {
    return useQuery({
        queryKey: ['historyRate', b, q, p],
        queryFn: () => getCompareYesterdayRate({ base: b, quote: q, period: p }),
        enabled: Boolean(b),
        staleTime: 3600000,
    })
}
