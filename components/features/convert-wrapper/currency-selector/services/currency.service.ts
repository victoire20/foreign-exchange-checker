"use server";

import { Currency } from "@/components/features/convert-wrapper/currency-selector/types/currency.type";

export async function getCurrencies(): Promise<Currency[]> {
    {/*const baseUrl = process.env.BASE_URL;*/}
    const baseUrl = 'https://api.restcountries.com/countries/v5?response_fields=names.common,codes.alpha_2,flag.emoji,flag.url_svg,flag.url_png,currencies.code,currencies.name.currencies.symbol'

    if (!baseUrl) {
        throw new Error("BASE_URL doesn't exist.");
    }

    const response = await fetch(`${baseUrl}`, {
        // Optionnel : ajoutez un revalidation ou un cache selon vos besoins Next.js
        next: { revalidate: 3600 }
    });

    if (!response.ok) {
        throw new Error("Server error.");
    }

    return response.json();
}
