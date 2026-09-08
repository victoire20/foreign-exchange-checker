export type Currency = {
    iso_code: string;
    flag?: string;
    iso_numeric?: string;
    name: string;
    symbol?: string;
    start_date?: string;
    end_date?: string;
}

export type Rate = {
    date: string;
    base: string;
    quote: string;
    rate: number;
}

export type LiveMarketRate = Rate & {
    previousRate?: number;
    percent?: number;
}

export type Log = {
    time: string;
    pair: [string, string];
    value: string;
    convertor: string;
}

export type FavoritePair = {
    base: string;
    quote: string;
}