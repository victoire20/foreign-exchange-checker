"use client";

import {useQuery} from "@tanstack/react-query"
import {getCurrencies} from "@/components/features/convert-wrapper/currency-selector/services/currency.service";


export const useCurrencies = () => {
    return useQuery({
        queryKey: ['currencies'],
        queryFn: getCurrencies
    })
}