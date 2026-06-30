"use client";

import {CurrencySelectorItem} from "@/components/features/convert-wrapper/currency-selector/currency-selector-item";
import {useCurrencies} from "@/components/features/convert-wrapper/currency-selector/hooks/use-currencies";
import {useEffect} from "react";
import {forEach} from "eslint-config-next";

export const CurrencySelectItemList = () => {
    const dataPopular = [
        {
            'flag': '/images/flags/us.webp',
            'isoCode': 'usd',
            'label': 'US Dollar'
        },
        {
            'flag': '/images/flags/eu.webp',
            'isoCode': 'eur',
            'label': 'Euro'
        },
        {
            'flag': '/images/flags/gb.webp',
            'isoCode': 'gbp',
            'label': 'British Pound'
        },
    ]

    const dataOtherCurrencies = [
        {
            'flag': '/images/flags/ae.webp',
            'isoCode': 'aed',
            'label': 'UAE Dirham'
        },
        {
            'flag': '/images/flags/ar.webp',
            'isoCode': 'ars',
            'label': 'Argentine Peso'
        },
        {
            'flag': '/images/flags/au.webp',
            'isoCode': 'aud',
            'label': 'Australian Dollar'
        },
        {
            'flag': '/images/flags/bd.webp',
            'isoCode': 'bdt',
            'label': 'Bangladeshi Taka'
        },
    ]

    const {
        data:currencies=[],
        isLoading
    } = useCurrencies()

    if (isLoading) {
        return <div className="flex justify-between items-center p-2 text-[#9D9D9D] text-[12px] leading-[120%] tracking-[0.5px] text-center">
            Loading data...
        </div>
    }

    const popular = currencies.filter((currency: { isoCode: string; }) =>
        ["usd","eur","gbp"].includes(currency.isoCode)
    )
    const other = currencies.filter((currency: { isoCode: string; }) =>
        !["usd","eur","gbp"].includes(currency.isoCode)
    )

    popular.forEach((currency) => {
        console.log(currency)
    })
    console.log('popular => ' + popular.length)
    console.log('other => ' + other)


    return <>
        {/* Section Popular */}
        <div className="flex justify-between items-center p-2 text-[#9D9D9D] text-[12px] leading-[120%] tracking-[0.5px]">
            <span className="uppercase">popular</span>
            <span>3</span>
        </div>
        <hr className="border-[#2E2E2E] mb-1"/>

        <div className="mb-1">
            {other.map((value, index) => (
                <p key={index}>{value.isoCode}</p>
            ))}
        </div>

        <div className="mb-1">
            {dataPopular.length > 0 && (
                dataPopular.map((item, index) => (
                    <CurrencySelectorItem key={item.isoCode} flag={item.flag} isoCode={item.isoCode} label={item.label} />
                ))
            )}
        </div>

        {/* Section Other Currencies */}
        <div className="flex justify-between items-center p-2 text-[#9D9D9D] text-[12px] leading-[120%] tracking-[0.5px]">
            <span className="uppercase">other currencies</span>
            <span>52</span>
        </div>
        <hr className="border-[#2E2E2E] mb-1"/>

        <div className="mb-1">
            {dataOtherCurrencies.length > 0 && (
                dataOtherCurrencies.map((item, index) => (
                    <CurrencySelectorItem key={item.isoCode} flag={item.flag} isoCode={item.isoCode} label={item.label} />
                ))
            )}
        </div>
    </>
}