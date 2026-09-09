"use client"

import {FaArrowRight, FaCaretDown, FaCaretUp, FaStar} from "react-icons/fa";
import {CiStar} from "react-icons/ci";
import {useEffect, useState} from "react";
import {FavoritePair} from "@/components/features/convert-wrapper/currency-selector/types/forex.type";
import {useCompareYesterdayRate} from "@/components/features/convert-wrapper/currency-selector/hooks/useForex";
import {Toast} from "@/components/ui/toast";
import FavoritePairItem from "@/components/features/favorite/FavoriteItem";

interface Props {
    favorites: FavoritePair[];
    onDeleteFavorite: (index: number) => void;
    onSelectFavorite: (favorite: FavoritePair) => void;
}

interface FavoriteDisplay {
    index: number;
    base: string;
    quote: string;
    rate: number;
    variation: number;
}

const FavoriteList = ({ favorites, onDeleteFavorite, onSelectFavorite }: Props) => {
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

    return <div className="bg-[#171719] border border-[#202022] p-4 md:p-5 rounded-2xl">
        {showToast && isHydrated && <Toast message="Favorite removed" onClose={() => setShowToast(false)} />}
        {!isHydrated ? (
            <div className="flex flex-col gap-3">
                <div className="skeleton-item h-5 w-36 rounded-md" />
                <div className="skeleton-item h-14 w-full rounded-[10px]" />
            </div>
        ) : favorites.length > 0 ? (
            <>
                <div className="uppercase flex justify-between items-center mb-4 md:mb-5">
                    <span className="text-[16px] leading-[120%] tracking-[1px]">pinned pairs</span>
                    <span className="opacity-70 text-[12px] leading-[120%] tracking-[0.5px]">
                        {favorites.length > 1 ? `${favorites.length} favorites` : `${favorites.length} favorite`}
                    </span>
                </div>
                <div className="flex flex-col items-center gap-3">
                    {favorites.map((favorite, index) => (
                        <FavoritePairItem
                            key={index}
                            favorite={favorite}
                            index={index}
                            onDelete={() => handleDeleteFavorite(index)}
                            onSelect={() => onSelectFavorite(favorite)}
                        />
                    ))}
                </div>
            </>
        ) : (
            <div className="text-center py-5 px-20 md:py-10 md:px-45 lg:px-60">
                <h2 className="text-[#C6C6C6] text-[20px] leading-[120%] tracking-[-0.5px] mb-4">No pinned pairs yet</h2>
                <p className="text-[#9D9D9D] text-[14px] leading-[120%] tracking-[1px]">
                    Pin a pair to track its rate here. Tap the star icon on any conversion or comparison row.
                </p>
            </div>
        )}
    </div>
}

export default FavoriteList