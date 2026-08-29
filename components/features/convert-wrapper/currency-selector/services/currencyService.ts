"use server"

import {
    Currency,
    RestCountriesResponse
} from "@/components/features/convert-wrapper/currency-selector/types/currency.type";

export async function getCurrencies(): Promise<Currency[]> {
    try {
        const uri = process.env.REST_COUNTRY_URI
        const apiKey = process.env.REST_COUNTRY_API_KEY
        const baseUrl = `${uri}?response_fields=codes.alpha_2,flag.url_svg,flag.url_png,currencies.code,currencies.name,currencies.symbol`

        if (!uri) {
            throw new Error("REST_COUNTRY_URI doesn't exist.")
        }

        if (!apiKey) {
            throw new Error("REST_COUNTRY_API_KEY doesn't exist.")
        }

        const response = await fetch(`${baseUrl}`, {
            headers: {
                Authorization: `Bearer ${apiKey}`,
            },
            next: {
                revalidate: 3600,
            },
        })

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}.`)
        }

        const data: RestCountriesResponse = await response.json()

        const allCurrencies = data.data.objects.flatMap((country) => {
            if (!country.currencies?.length) {
                return []
            }

            return country.currencies.map((curr) => ({
                isoCode: curr.code,
                countryCode: country.codes.alpha_2 ?? "",
                name: curr.name,
                symbol: curr.symbol,
                flag: country.flag.url_svg || country.flag.url_png
            }))
        })

        const uniqueCurrenciesMap = new Map<string, Currency>();

        allCurrencies.forEach((currency) => {
            uniqueCurrenciesMap.set(currency.name, currency);
        });

        return Array.from(uniqueCurrenciesMap.values());
    } catch (e) {
        return []
    }
}
