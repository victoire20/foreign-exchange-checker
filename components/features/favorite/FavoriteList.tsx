"use client"

import {FaArrowRight, FaCaretDown, FaCaretUp, FaStar} from "react-icons/fa";
import {CiStar} from "react-icons/ci";
import {useEffect, useState} from "react";
import {FavoritePair} from "@/components/features/convert-wrapper/currency-selector/types/forex.type";
import {useCompareYesterdayRate} from "@/components/features/convert-wrapper/currency-selector/hooks/useForex";
import {Toast} from "@/components/ui/toast";

interface Props {
    favorites: FavoritePair[];
    onDeleteFavorite: (index: number) => void;
}

interface FavoriteDisplay {
    index: number;
    base: string;
    quote: string;
    rate: number;
    variation: number;
}

const FavoriteList = ({ favorites, onDeleteFavorite }: Props) => {
    const [favoriteDisplays, setFavoriteDisplays] = useState<FavoriteDisplay[]>([])
    const [showToast, setShowToast] = useState(false)
    const [isHydrated, setIsHydrated] = useState(false)

    useEffect(() => {
        setIsHydrated(true)
    }, [])

    // Charger les données pour chaque favori
    useEffect(() => {
        const displays: FavoriteDisplay[] = favorites.map((fav, index) => ({
            index,
            base: fav.base,
            quote: fav.quote,
            rate: 0,
            variation: 0
        }))
        
        setFavoriteDisplays(displays)
    }, [favorites])

    const handleDeleteFavorite = (index: number) => {
        onDeleteFavorite(index)
        setShowToast(true)
        setTimeout(() => setShowToast(false), 3000)
    }

    return <div className="bg-[#171719] border border-[#202022] p-[16px] md:p-[20px] rounded-[16px]">
        {showToast && isHydrated && <Toast message="Favorite removed" onClose={() => setShowToast(false)} />}
        {isHydrated && favorites.length > 0 ? (
            <>
                <div className="uppercase flex justify-between items-center mb-[16px] md:mb-[20px]">
                    <span className="text-[16px] leading-[120%] tracking-[1px]">pinned pairs</span>
                    <span className="opacity-70 text-[12px] leading-[120%] tracking-[0.5px]">
                        {favorites.length > 1 ? `${favorites.length} favorites` : `${favorites.length} favorite`}
                    </span>
                </div>
                <div className="flex flex-col items-center gap-[12px]">
                    {favorites.map((favorite, index) => (
                        <FavoritePairItem
                            key={index}
                            favorite={favorite}
                            index={index}
                            onDelete={() => handleDeleteFavorite(index)}
                        />
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
}

const FavoritePairItem = ({ favorite, index, onDelete }: { favorite: FavoritePair; index: number; onDelete: () => void }) => {
    const { data: historyRate = [] } = useCompareYesterdayRate({
        b: favorite.base,
        q: favorite.quote,
        p: 'd'
    })

    const [rate, setRate] = useState(0)
    const [variation, setVariation] = useState(0)

    useEffect(() => {
        if (historyRate.length > 0) {
            const lastRate = historyRate[historyRate.length - 1]?.rate || 0
            const firstRate = historyRate[0]?.rate || lastRate
            
            setRate(lastRate)
            
            if (lastRate !== 0 && firstRate !== 0) {
                const change = firstRate - lastRate
                const percent = (change / firstRate) * 100
                setVariation(percent)
            }
        }
    }, [historyRate])

    return (
        <div
            className="p-[12px] min-w-[100%] bg-[#202022] border border-[#2E2E2E] hover:border-[#454547]
                rounded-[10px] flex justify-between items-center md:cursor-pointer">
            <div className="uppercase flex gap-[8px] items-center text-[14px] leading-[120%] tracking-[1px]">
                {favorite.base} <FaArrowRight className="text-[#9D9D9D] text-[10px]" /> {favorite.quote}
            </div>
            <div className="flex gap-[20px] items-center">
                <div className="flex flex-col gap-[6px] justify-between items-end text-right">
                    <span className="text-[16px] leading-[120%] tracking-[1px] text-[#C6C6C6]">{rate.toFixed(4)}</span>
                    <span className={`${variation > 0 ? 'text-[#42EB05]' : 'text-[#FF4141]'} flex items-center text-[10px] leading-[100%] tracking-[0px]`}>
                        {variation > 0 ? (
                            <>
                                <FaCaretUp />&nbsp;{`+${variation.toFixed(2)}%`}
                            </>
                        ) : variation < 0 ? (
                            <>
                                <FaCaretDown />&nbsp;{`${variation.toFixed(2)}%`}
                            </>
                        ) : (
                            <>
                                <span>&nbsp;0.00%</span>
                            </>
                        )}
                    </span>
                </div>
                <button
                    onClick={onDelete}
                    className={`p-[8px] bg-[#202022] border border-[#CEF739] rounded-[8px] hover:bg-[#3D3D3D] md:cursor-pointer transition-all duration-300`}>
                    <FaStar className="text-[#CEF739]" />
                </button>
            </div>
        </div>
    )
}

export default FavoriteList