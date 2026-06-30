"use client";

import Image from "next/image";
import {useState} from "react";
import {Select} from "@/components/ui/select";
import {Badge} from "@/components/ui/badge";
import {FaArrowRight, FaCaretDown, FaCaretUp, FaStar} from "react-icons/fa";
import {LuTrash} from "react-icons/lu";
import {CiStar} from "react-icons/ci"
import {Card} from "@/components/ui/card";


export default function Details() {
    const [filter, setFilter] = useState("history")

    const compareData = [
        {
            'flag': '/images/flags/gb.webp',
            'codeIso': 'gbp',
            'name': 'british pound',
            'value': '736.65',
            'indice': '0.7366',
            'isFavorite': true
        },
        {
            'flag': '/images/flags/jp.webp',
            'codeIso': 'jpy',
            'name': 'japanese yen',
            'value': '157,910',
            'indice': '157.91',
            'isFavorite': true
        },
        {
            'flag': '/images/flags/ch.webp',
            'codeIso': 'chf',
            'name': 'swiss franc',
            'value': '909.80',
            'indice': '0.9098',
            'isFavorite': false
        },
        {
            'flag': '/images/flags/ca.webp',
            'codeIso': 'cad',
            'name': 'canadian dollar',
            'value': '1,381.50',
            'indice': '1.3815',
            'isFavorite': false
        },
        {
            'flag': '/images/flags/au.webp',
            'codeIso': 'aud',
            'name': 'australian dollar',
            'value': '1,387.35',
            'indice': '1.3874',
            'isFavorite': false
        },
        {
            'flag': '/images/flags/in.webp',
            'codeIso': 'inr',
            'name': 'indian rupee',
            'value': '94,910.00',
            'indice': '94.910',
            'isFavorite': true
        },
        {
            'flag': '/images/flags/cn.webp',
            'codeIso': 'cny',
            'name': 'chinese yuan',
            'value': '7,210.00',
            'indice': '7.2100',
            'isFavorite': false
        },
        {
            'flag': '/images/flags/bd.webp',
            'codeIso': 'bdt',
            'name': 'bangladeshi taka',
            'value': '122,920',
            'indice': '122,92',
            'isFavorite': true
        },
    ]

    const favoriteData = [
        {
            'pair': ['usd', 'eur'],
            'value': '0.8530',
            'variation': 0.16,
            'isFavorite': true
        },
        {
            'pair': ['gbp', 'usd'],
            'value': '1.357',
            'variation': -0.22,
            'isFavorite': true
        },
    ]

    const logData = [
        {
            'quantity': '20M',
            'pair': ['gbp', 'usd'],
            'value': '1,000.00',
            'indice': '853.02'
        },
        {
            'quantity': '34M',
            'pair': ['eur', 'jpy'],
            'value': '500.00',
            'indice': '92,490'
        },
        {
            'quantity': '50M',
            'pair': ['gbp', 'usd'],
            'value': '250.00',
            'indice': '339,38'
        },
    ]

    return <div className="flex flex-col gap-4 mt-10">
        {/* Bloc Mobile (visible uniquement sous 768px) */}
        <Select
            value={filter}
            onChange={setFilter}
            options={[
                {
                    label: "History",
                    value: "history"
                },
                {
                    label: "Compare",
                    value: "compare"
                },
                {
                    label: "Favorites",
                    value: "favorites",
                    badge: 10
                },
                {
                    label: "Log",
                    value: "log",
                    badge: 8
                }
            ]}
            className="md:hidden"
        />

        {/* Bloc Tablette/Desktop (masqué sous 768px, visible au-dessus) */}
        <nav className="hidden md:flex gap-2 border-b border-[#202022] text-base leading-[1.2] tracking-wider text-[#A0A0A5]">
            <button className="uppercase px-4 py-[10.5px] border-b-2 border-[#CEF739] hover:text-white transition-colors md:cursor-pointer focus-visible:rounded-[4px]">
                history
            </button>
            <button className="uppercase px-4 py-[10.5px] border-b-2 border-transparent hover:text-white transition-colors md:cursor-pointer focus-visible:rounded-[4px]">
                compare
                <div className="h-[2px] w-full bg-[red]"></div>
            </button>
            <button className="uppercase flex gap-[8px] px-4 py-[10.5px] border-b-2 border-transparent hover:text-white transition-colors md:cursor-pointer focus-visible:rounded-[4px]">
                favorites
                <Badge value={10}/>
            </button>
            <button className="uppercase flex gap-[8px] px-4 py-[10.5px] border-b-2 border-transparent hover:text-white transition-colors md:cursor-pointer focus-visible:rounded-[4px]">
                log
                <Badge value={8}/>
            </button>
        </nav>

        <div className="flex flex-col gap-5 lg:flex-row lg:justify-between lg:items-center">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 md:gap-4 lg:max-w-[80%]">
                <Card label="open" value="0.8516" />
                <Card label="last" value="0.8530" />
                <Card label="change" value="+0.0014" classNameValue="text-[#42EB05]" />
                <Card label="% change" value="▲ +0.16%" classNameValue="text-[#42EB05]" />
            </div>
            <nav
                className="p-0.5 max-w-71.5 rounded-lg bg-[#171719] flex justify-between items-center text-[#9D9D9D]
                text-[12px] leading-[120%] tracking-[0.5px]">
                <button className="px-4 py-3 md:cursor-pointer hover:text-white hover:bg-[#2E2E2E] hover:rounded-lg focus-visible:rounded-[8px]">1D</button>
                <button className="px-4 py-3 md:cursor-pointer hover:text-white hover:bg-[#2E2E2E] hover:rounded-lg focus-visible:rounded-[8px]">1W</button>
                <button className="px-4 py-3 md:cursor-pointer text-white rounded-lg bg-[#2E2E2E] focus-visible:rounded-[8px]">1M</button>
                <button className="px-4 py-3 md:cursor-pointer hover:text-white hover:bg-[#2E2E2E] hover:rounded-lg focus-visible:rounded-[8px]">3M</button>
                <button className="px-4 py-3 md:cursor-pointer hover:text-white hover:bg-[#2E2E2E] hover:rounded-lg focus-visible:rounded-[8px]">1Y</button>
                <button className="px-4 py-3 md:cursor-pointer hover:text-white hover:bg-[#2E2E2E] hover:rounded-lg focus-visible:rounded-[8px]">5Y</button>
            </nav>
        </div>

        {/* Historique div */}
        <div className="bg-[#171719] border border-[#202022] px-3 py-4 md:px-5 md:py-5 rounded-2xl">
            <div className="flex justify-between items-center mb-[16px] md:mb-[20px]">
                <span className="uppercase text-[16px] leading-[120%] tracking-[1px]">usd/eur</span>
                <span className="opacity-70 text-[12px] leading-[120%] tracking-[0.5px]">0.8530 · MAY 14 16:00 CET</span>
            </div>
            <div className=""></div>
        </div>
        {/* Historique empty div */}
        <div className="bg-[#171719] border border-[#202022] rounded-2xl text-center py-[20px] px-[80px] md:py-[40px] md:px-[180px] lg:px-[240px]">
            <h2 className="text-[#C6C6C6] text-[20px] leading-[120%] -tracking-[0.5px] mb-[16px]">No chart data available</h2>
            <p className="text-[#9D9D9D] text-[14px] leading-[120%] tracking-[1px]">
                We couldn't load rate history for [pair] right now. This usually clears up in a minute.
            </p>
        </div>

        {/* compare div */}
        <div className="bg-[#171719] border border-[#202022] p-[16px] md:p-[20px] rounded-[16px]">
            {compareData.length > 0 ? (
                <>
                    <div className="uppercase mb-[16px] md:mb-[20px] md:flex md:justify-between md:items-center">
                        <div className="mb-[11px] md:mb-[0px]">
                            <span className="text-[14px] leading-[120%] tracking-[1px] text-[#9D9D9D]">multi-currency</span>
                            &nbsp;
                            <span className="text-[16px] leading-[120%] tracking-[1px]">1,000 from usd</span>
                        </div>
                        <p className="text-[#FFF] opacity-70 text-[12px] leading-[120%] tracking-[0.5px]">{compareData.length > 1 ? `${compareData.length} pairs` : `${compareData} pair`}</p>
                    </div>
                    <div className="flex flex-col items-center gap-[12px]">
                        {compareData.map((item, index) => (
                            <div
                                key={index}
                                className="p-[12px] min-w-[100%] bg-[#202022] border border-[#2E2E2E] hover:border-[#454547] rounded-[10px] flex
                                justify-between items-center md:cursor-pointer">
                                <div className="flex gap-[10px] items-center">
                                    <div>
                                        <Image className="rounded-[50%]" src={`${item.flag}`} alt={`flag ${item.codeIso}`} width={24} height={24} />
                                    </div>
                                    <div className="flex flex-col gap-[6px] justify-between">
                                        <span className="uppercase text-[14px] leading-[120%] tracking-[1px]">{item.codeIso}</span>
                                        <span className="capitalize text-[#9D9D9D] text-[12px] leading-[120%] tracking-[0.5px]">{item.name}</span>
                                    </div>
                                </div>
                                <div className="flex gap-[10px] items-center">
                                    <div className="flex flex-col gap-[6px] justify-between text-right">
                                        <span className="text-[16px] leading-[120%] tracking-[1px]">{item.value}</span>
                                        <span className="text-[#9D9D9D] text-[10px] leading-[100%] tracking-[0px]">@ {item.indice}</span>
                                    </div>
                                    <div className={`p-[8px] bg-[#202022] border border-[#2E2E2E] rounded-[8px] ${item.isFavorite && 'border-[#CEF739]'}`}>
                                        {item.isFavorite ? (
                                            <FaStar className="text-[#CEF739]" />
                                        ) : (
                                            <CiStar />
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div className="text-center py-[20px] px-[80px] md:py-[40px] md:px-[180px] lg:px-[240px]">
                    <h2 className="text-[#C6C6C6] text-[20px] leading-[120%] -tracking-[0.5px] mb-[16px]">No comparison available</h2>
                    <p className="text-[#9D9D9D] text-[14px] leading-[120%] tracking-[1px]">
                        Enter an amount in Send above to see what your money is worth in other currencies.
                    </p>
                </div>
            )}
        </div>

        {/* favorites div */}
        <div className="bg-[#171719] border border-[#202022] p-[16px] md:p-[20px] rounded-[16px]">
            {favoriteData.length > 0 ? (
                <>
                    <div className="uppercase flex justify-between items-center mb-[16px] md:mb-[20px]">
                        <span className="text-[16px] leading-[120%] tracking-[1px]">pinned pairs</span>
                        <span className="opacity-70 text-[12px] leading-[120%] tracking-[0.5px]">
                            {favoriteData.length > 1 ? `${favoriteData.length} favorites` : `${favoriteData.length} favorite`}
                        </span>
                    </div>
                    <div className="flex flex-col items-center gap-[12px]">
                        {favoriteData.map((item, index) => (
                            <div
                                key={index}
                                className="p-[12px] min-w-[100%] bg-[#202022] border border-[#2E2E2E] hover:border-[#454547]
                                rounded-[10px] flex justify-between items-center md:cursor-pointer">
                                <div className="uppercase flex gap-[8px] items-center text-[14px] leading-[120%] tracking-[1px]">
                                    {item.pair[0]} <FaArrowRight className="text-[#9D9D9D] text-[10px]" /> {item.pair[1]}
                                </div>
                                <div className="flex gap-[20px] items-center">
                                    <div className="flex flex-col gap-[6px] justify-between items-end text-right">
                                        <span className="text-[16px] leading-[120%] tracking-[1px]">{item.value}</span>
                                        <span className={`${item.variation > 0 ? 'text-[#42EB05]' : 'text-[#FF4141]'} flex items-center text-[10px] leading-[100%] tracking-[0px]`}>
                                            {item.variation > 0 ? (
                                                <>
                                                    <FaCaretUp />&nbsp;{`+${item.variation}%`}
                                                </>
                                            ) : (
                                                <>
                                                    <FaCaretDown />&nbsp;{`${item.variation}%`}
                                                </>
                                            )}
                                        </span>
                                    </div>
                                    <div className={`p-[8px] bg-[#202022] border border-[#2E2E2E] rounded-[8px] ${item.isFavorite && 'border-[#CEF739]'}`}>
                                        {item.isFavorite ? (
                                            <FaStar className="text-[#CEF739]" />
                                        ) : (
                                            <CiStar />
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div className="text-center py-[20px] px-[80px] md:py-[40px] md:px-[180px] lg:px-[240px]">
                    <h2 className="text-[#C6C6C6] text-[20px] leading-[120%] -tracking-[0.5px] mb-[16px]">No pinned pairs yet</h2>
                    <p className="text-[#9D9D9D] text-[14px] leading-[120%] tracking-[1px]">
                        Pin a pair to track its rate here. Tap the star icon on any conversion or comparison row.
                    </p>
                </div>
            )}
        </div>

        {/* log div */}
        <div className="bg-[#171719] border border-[#202022] p-[16px] md:p-[20px] rounded-[16px]">
            {logData.length > 0 ? (
                <>
                    <div className="uppercase flex flex-col md:flex-row md:items-center justify-between gap-[10px] mb-[20px]">
                        <span className="text-[16px] leading-[120%] tracking-[1px]">conversion log</span>
                        <div className="flex justify-between items-center md:gap-[16px]">
                            <span className="text-[#FFF] opacity-70 text-[12px] leading-[120%] tracking-[0.5px]">{logData.length} logged</span>
                            <button
                                className="uppercase py-[8px] px-[12px] text-[#9D9D9D] text-[12px] leading-[120%]
                                tracking-[0.5px] bg-[#202022] border border-[#3D3D3D] rounded-[8px] hover:bg-[#3D3D3D] hover:border-[#3D3D3D] md:cursor-pointer">
                                clear all
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col gap-[12px]">
                        {logData.map((item, index) => (
                            <div
                                key={index}
                                className="flex flex-rows justify-between bg-[#202022] border border-[#2E2E2E] p-[12px] rounded-[8px]">
                                <div className="flex flex-col gap-[4px] md:flex-row md:justify-between md:gap-[48px] md:items-center">
                                    <span className="text-[#9D9D9D] text-[14px] leading-[120%] tracking-[1px]">{item.quantity}</span>
                                    <div className="uppercase flex gap-[8px] items-center text-[14px] leading-[120%] tracking-[1px]">
                                        {item.pair[0]} <FaArrowRight className="text-[#9D9D9D] text-[10px]" /> {item.pair[1]}
                                    </div>
                                </div>
                                <div className="flex gap-[10px] items-center">
                                    <div className="flex flex-col justify-between md:flex-row md:gap-[20px] text-right">
                                        <span className="text-[#C6C6C6] text-[16px] leading-[120%] tracking-[1px]">{item.value}</span>
                                        <span className="text-[#CEF739] text-[16px] leading-[120%] tracking-[1px]">{item.indice}</span>
                                    </div>
                                    <button
                                        className="p-[10px] bg-[#202022] border border-[#2E2E2E] rounded-[8px]
                                        hover:bg-[#3D3D3D] hover:border-[#3D3D3D] md:cursor-pointer">
                                        <LuTrash />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div className="text-center py-[20px] px-[80px] md:py-[40px] md:px-[120px]">
                    <h2 className="text-[#C6C6C6] text-[20px] leading-[120%] -tracking-[0.5px] mb-[16px]">No conversions logged yet</h2>
                    <p className="text-[#9D9D9D] text-[14px] leading-[120%] tracking-[1px]">
                        Every conversion is recorded here automatically when you tap Log conversion. Your log is private to this session and this browser.
                    </p>
                </div>
            )}
        </div>
    </div>
}