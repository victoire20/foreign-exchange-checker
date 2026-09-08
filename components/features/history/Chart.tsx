"use client"

import {
    Chart as ChartJS,
    CategoryScale, ChartData,
    ChartOptions,
    Filler,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip
} from "chart.js";
import {Line} from "react-chartjs-2";
import {Rate} from "@/components/features/convert-wrapper/currency-selector/types/forex.type";
import {dateFormat, getShortDate} from "@/utils/dateFormat";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
)

interface AreaChartProps {
    isLoading: boolean;
    labels: string[];
    chartDataValues: number[];
}

const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false, // Permet au graphique de s'adapter au conteneur parent
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: false,
        },
    },
    scales: {
        y: {
            beginAtZero: false,
        },
    },
}

function AreaChart({ isLoading, labels, chartDataValues }: AreaChartProps) {
    // Créer un gradient pour le remplissage
    const chartConfig: ChartData<'line'> = {
        labels: labels,
        datasets: [
            {
                fill: true,
                data: chartDataValues,
                borderColor: '#CEF739',
                backgroundColor: (context) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
                    gradient.addColorStop(0, 'rgba(206, 247, 57, 0.6)');
                    gradient.addColorStop(1, 'rgba(206, 247, 57, 0)');
                    return gradient;
                },
                borderWidth: 2,
                tension: 0.4,
                pointRadius: 0,
                pointBorderWidth: 0,
            },
        ],
    };
    return (
        <div className={`${isLoading && 'skeleton-item'} w-full h-75`}>
            {!isLoading && <Line options={options} data={chartConfig} />}
        </div>
    )
}

interface Props {
    rate: Rate;
    isLoading: boolean;
    historyRate: Array<Rate>;
    period: string;
}


function formatLabels(period: string, historyRate: Array<Rate>): string[] {
    if (historyRate.length === 0) return []

    const labels = historyRate.map(item => getShortDate(period, item.date))

    if (period === 'd') {
        const result = []
        for (let i=0; i<24; i++) {
            result.push(`${String(i).padStart(2, '0')}:00`)
        }
        result.push('00:00')
        return result
    }

    if (period === 'w') {
        return labels
    }

    const uniqueLabels: string[] = []
    let lastLabel = ''
    
    labels.forEach((label, index) => {
        if (label !== lastLabel) {
            uniqueLabels.push(label)
            lastLabel = label
        } else {
            uniqueLabels.push(label)
        }
    });
    
    return uniqueLabels
}

function extractChartData(historyRate: Array<Rate>, period: string, labels: string[]): number[] {
    if (historyRate.length === 0) return []

    const currentHours = String(new Date().getHours()).padStart(2, '0')

    if (period === 'd') {
        const lastHoursIndex = labels.findIndex(item => item.split(':')[0] === currentHours)

        const endIndex = lastHoursIndex === -1 ? labels.length : lastHoursIndex + 1
        const availableHours = labels.slice(0, endIndex)

        return availableHours.map((item, index) => {
            const hourPart = item.split(':')[0]
            const minutePart = item.split(':')[1]

            if (hourPart === currentHours) {
                return historyRate[0].rate
            } else if (minutePart === currentHours) {
                return historyRate[1]?.rate ?? historyRate[0].rate
            } else {
                const rateDiff = (historyRate[1]?.rate ?? historyRate[0].rate) - historyRate[0].rate
                return ((index + 1) / availableHours.length) * rateDiff + historyRate[0].rate
            }
        });
    } else {
        return historyRate.map(item => item.rate)
    }
}


function normalizeYAxis(data: number[]): { min: number; max: number; padding: number } {
    if (data.length === 0) return { min: 0, max: 1, padding: 0 }

    const min = Math.min(...data)
    const max = Math.max(...data)
    const range = max - min

    // Ajouter 10% de padding pour une meilleure visualisation
    const padding = range * 0.1

    return {
        min: Math.max(0, min - padding),
        max: max + padding,
        padding
    }
}


export default function ChartHistory({ rate, isLoading, historyRate, period }: Props) {
    const labels = formatLabels(period, historyRate)

    const chartDataValues = extractChartData(historyRate, period, labels)

    const yAxisConfig = normalizeYAxis(chartDataValues)

    const customOptions: ChartOptions<'line'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
            },
        },
        scales: {
            y: {
                min: yAxisConfig.min,
                max: yAxisConfig.max,
                beginAtZero: false,
            },
        },
    }

    return <>
        {chartDataValues.length > 0 ? (
            <div className={`${isLoading && 'skeleton-item'} bg-[#171719] border border-[#202022] px-3 py-4 md:px-5 md:py-5 rounded-2xl`}>
                <div className={`${isLoading && 'skeleton-item'} flex justify-between items-center mb-4 md:mb-5`}>
                    <span className={`${isLoading && 'skeleton-item'} uppercase text-[16px] leading-[120%] tracking-[1px]`}>
                        {rate.base}/{rate.quote}
                    </span>
                    <span className={`${isLoading && 'skeleton-item'} opacity-70 text-[12px] leading-[120%] tracking-[0.5px]`}>
                        {chartDataValues[chartDataValues.length - 1]?.toFixed(5)} · {dateFormat(String(historyRate.at(-1)?.date))}
                    </span>
                </div>
                <div className={`${isLoading && 'skeleton-item'}`}>
                    <AreaChart isLoading={isLoading} labels={labels} chartDataValues={chartDataValues} />
                </div>
            </div>
        ) : (
            <div className={`${isLoading && 'skeleton-item'} bg-[#171719] border border-[#202022] rounded-2xl text-center py-5 px-20 md:py-10 md:px-45 lg:px-60`}>
                <h2 className={`${isLoading && 'skeleton-item'} text-[#C6C6C6] text-[20px] leading-[120%] tracking-[-0.5px] mb-4`}>No chart data available</h2>
                <p className={`${isLoading && 'skeleton-item'} text-[#9D9D9D] text-[14px] leading-[120%] tracking-[1px]`}>
                    {`We couldn't load rate history for ${rate.base}/${rate.quote} right now. This usually clears up in a minute.`}
                </p>
            </div>
        )}
    </>
}